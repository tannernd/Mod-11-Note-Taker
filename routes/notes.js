const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');

// This API route is a GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
    res.json(JSON.parse(data));
    });
});

// This API route is a POST Route for a new notes
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
        title,
        text,
        id:uuid() 
    };
    // Reads the existing file and parses the data
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        parsedData = JSON.parse(data);
        // Push new data
        parsedData.push(newNote);
        // Write new file including new data
        fs.writeFile("./db/db.json", JSON.stringify(parsedData, null, '\t'),(err) => 
        err ? console.error(err) : console.info(`\nData written`));
    });
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// This API route is a DELETE Route for deleting a note
notes.delete('/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        parsedData = JSON.parse(data);
        parsedData = parsedData.filter(id => id.id != req.params.id);
        fs.writeFile("./db/db.json", JSON.stringify(parsedData, null, '\t'),(err) => 
        err ? console.error(err) : console.info(`\nData Deleted`));
    });
    res.json(`Note deleted successfully`);
});

module.exports = notes;
