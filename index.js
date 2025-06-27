const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pokemonRoutes = require('./routes/pokemon');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/pokedex';
const SECRET = process.env.JWT_SECRET || 'supersecret';

const USERNAME = process.env.API_USER || 'admin';
const PASSWORD_HASH = bcrypt.hashSync(process.env.API_PASS || 'password', 8);

mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username !== USERNAME) return res.status(401).json({ message: 'Invalid cred' });
  const valid = bcrypt.compareSync(password, PASSWORD_HASH);
  if (!valid) return res.status(401).json({ message: 'Invalid cred' });
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.use('/pokemon', authMiddleware, pokemonRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
