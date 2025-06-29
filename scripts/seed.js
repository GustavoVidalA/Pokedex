const mongoose = require('mongoose');
const Pokemon = require('../models/pokemon');

// Conexión a la base de datos
mongoose.connect('mongodb://mongo:27017/pokedex', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('📦 Conectado a MongoDB, insertando datos...');

  // Limpia la colección
  await Pokemon.deleteMany({});

  // Inserta los Pokémon
  await Pokemon.insertMany([
    { name: "Bulbasaur", type: "Grass" },
    { name: "Charmander", type: "Fire" },
    { name: "Squirtle", type: "Water" },
    { name: "Pidgey", type: "Flying" },
    { name: "Jigglypuff", type: "Fairy" },
    { name: "Geodude", type: "Rock" },
    { name: "Abra", type: "Psychic" },
    { name: "Machop", type: "Fighting" },
    { name: "Magnemite", type: "Electric" },
    { name: "Gastly", type: "Ghost" }
  ]);

  console.log('✅ Pokémon insertados correctamente.');
  process.exit();
}).catch(err => {
  console.error('❌ Error conectando a MongoDB:', err);
  process.exit(1);
});
