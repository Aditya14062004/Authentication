const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');

//Middleware
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Request logger
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request to: ${req.originalUrl}`);
    next();
};
app.use(logRequest);

// ✅ Allow frontend origin (Vite runs on port 5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Test routes
app.get('/', (req, res) => res.send('Server is running'));
app.get('/first', (req, res) => res.send('Just for test'));

// Import routers
const userRoutes = require('./routes/userRoutes.js');

// Using routers
app.use("/user", userRoutes);

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});