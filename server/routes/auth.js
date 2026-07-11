import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { selectQuery, runQuery } from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'wanderluxe_super_secret_key_2026';

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, fullName, username, phone } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const emailLower = email.trim().toLowerCase();
    const existing = selectQuery('SELECT * FROM users WHERE email = ?', [emailLower]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'User account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const role = emailLower === 'admin@gmail.com' ? 'admin' : 'user';

    runQuery(
      `INSERT INTO users (id, uid, email, password, fullName, username, phone, role, plan, joinedDate)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        userId,
        emailLower,
        hashedPassword,
        fullName || emailLower.split('@')[0],
        username || emailLower.split('@')[0],
        phone || '',
        role,
        role === 'admin' ? 'Enterprise VIP' : 'Free',
        new Date().toISOString()
      ]
    );

    const newUser = {
      uid: userId,
      email: emailLower,
      fullName: fullName || emailLower.split('@')[0],
      username: username || emailLower.split('@')[0],
      phone: phone || '',
      role,
      plan: role === 'admin' ? 'Enterprise VIP' : 'Free'
    };

    const token = jwt.sign(newUser, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: newUser });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error during signup' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    let emailLower = email.trim().toLowerCase();
    if (emailLower === 'admin') {
      emailLower = 'admin@gmail.com';
    }

    const rows = selectQuery('SELECT * FROM users WHERE email = ?', [emailLower]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email/username or password' });
    }

    const userRecord = rows[0];
    const passwordMatch = await bcrypt.compare(password, userRecord.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email/username or password' });
    }

    const userProfile = {
      uid: userRecord.uid || userRecord.id,
      email: userRecord.email,
      fullName: userRecord.fullName,
      username: userRecord.username,
      phone: userRecord.phone,
      role: userRecord.role || (userRecord.email === 'admin@gmail.com' ? 'admin' : 'user'),
      plan: userRecord.plan
    };

    const token = jwt.sign(userProfile, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user: userProfile });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const rows = selectQuery('SELECT * FROM users WHERE email = ?', [decoded.email]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found in SQLite3 database' });
    }

    const userRecord = rows[0];
    const userProfile = {
      uid: userRecord.uid || userRecord.id,
      email: userRecord.email,
      fullName: userRecord.fullName,
      username: userRecord.username,
      phone: userRecord.phone,
      role: userRecord.role || (userRecord.email === 'admin@gmail.com' ? 'admin' : 'user'),
      plan: userRecord.plan
    };

    res.status(200).json({ user: userProfile });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

export default router;
