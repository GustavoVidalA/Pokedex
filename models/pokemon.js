const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
