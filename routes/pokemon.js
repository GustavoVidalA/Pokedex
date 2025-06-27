const express = require('express');
const Pokemon = require('../models/pokemon');
const router = express.Router();

// Create
router.post('/', async (req, res) => {
  try {
    const pokemon = await Pokemon.create(req.body);
    res.status(201).json(pokemon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  const pokemons = await Pokemon.find();
  res.json(pokemons);
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) return res.status(404).json({ message: 'Not found' });
    res.json(pokemon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pokemon) return res.status(404).json({ message: 'Not found' });
    res.json(pokemon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!pokemon) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
