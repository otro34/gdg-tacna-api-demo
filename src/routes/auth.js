const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/register', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !EMAIL_REGEX.test(email) || !password) {
    return res.status(400).json({ error: 'Email o contraseña inválidos' });
  }
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ error: 'El email ya está registrado' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, email, passwordHash });
  res.status(201).json({ email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ sub: user.id, email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
