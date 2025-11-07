const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// defining the user schema
const userSchema = new mongoose.Schema({
    gmail: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    otp: { type: String},
    otpExpiry: { type: Date},
});

userSchema.pre('save', async function(next){
    const user = this;

    // Hash the password only if it has been modified (or in new)
    if(!user.isModified('password')) return next();

    try {
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // override the plain password with the hashed one
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try {
        // use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

// Creating user model
const User = mongoose.model('User', userSchema);
module.exports = User;