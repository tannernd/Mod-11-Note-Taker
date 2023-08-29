const express = require('express');

// Import our file containing our notes router
const notesRouter = require('./notes');

// Create and instance of express
const app = express();

// Middleware to use the notes route
app.use('/notes', notesRouter);

module.exports = app;
