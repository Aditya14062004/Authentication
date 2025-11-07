// Importing the mongoose and defining the mongodb url
const mongoose = require('mongoose');
require('dotenv').config();

// Define the mongoDB URL
const mongoURL = process.env.MONGODB_URL;

// Setup MongoDB connection
mongoose.connect(mongoURL);

// Get the default connection
const db = mongoose.connection;

// Event listener for telling the current state of the database connection
db.on('connected', ()=>{
    console.log('connected to MongoDB server');
});

db.on('error', (err)=>{
    console.log('MongoDB connection error', err);
});

db.on('disconnected', ()=>{
    console.log('MonogoDB disconnected');
})

// Export the db module
module.exports = db;