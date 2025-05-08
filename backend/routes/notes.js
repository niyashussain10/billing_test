// routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create a note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
