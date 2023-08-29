const express = require('express');
const path = require('path');
const api = require('./routes/index');
// connect the port
const PORT = process.env.PORT || 3001;
// start the express app
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// Send all the requests that begin with /api to the index.js in the routes folder
app.use('/api', api);

// route the get request for /notes to the notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// wildcard route for all other routes to the homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// start the server listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
