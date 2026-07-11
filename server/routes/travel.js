import express from 'express';
import { selectQuery, runQuery } from '../db.js';

const router = express.Router();

// Helper to deserialize dataJson if present
function formatRow(row) {
  if (!row) return null;
  if (row.dataJson) {
    try {
      return JSON.parse(row.dataJson);
    } catch (e) {}
  }
  return row;
}

// Destinations
router.get('/destinations', (req, res) => {
  const rows = selectQuery('SELECT * FROM destinations');
  res.json(rows.map(formatRow));
});

router.get('/destinations/:id', (req, res) => {
  const rows = selectQuery('SELECT * FROM destinations WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Destination not found' });
  res.json(formatRow(rows[0]));
});

router.post('/destinations', (req, res) => {
  const data = req.body;
  const id = data.id || `dest-${Date.now()}`;
  const fullData = { ...data, id };
  runQuery(
    `INSERT INTO destinations (id, title, location, price, rating, reviews, image, category, description, dataJson)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      fullData.name || fullData.title || '',
      fullData.location || '',
      fullData.price || 0,
      fullData.ratings || fullData.rating || 5,
      fullData.reviewsCount || fullData.reviews || 0,
      Array.isArray(fullData.images) ? fullData.images[0] : fullData.image || '',
      fullData.category || '',
      fullData.description || '',
      JSON.stringify(fullData)
    ]
  );
  res.status(201).json(fullData);
});

router.delete('/destinations/:id', (req, res) => {
  runQuery('DELETE FROM destinations WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

// Packages
router.get('/packages', (req, res) => {
  const rows = selectQuery('SELECT * FROM packages');
  res.json(rows.map(formatRow));
});

router.get('/packages/:id', (req, res) => {
  const rows = selectQuery('SELECT * FROM packages WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Package not found' });
  res.json(formatRow(rows[0]));
});

router.post('/packages', (req, res) => {
  const data = req.body;
  const id = data.id || `pkg-${Date.now()}`;
  const fullData = { ...data, id };
  runQuery(
    `INSERT INTO packages (id, title, destination, days, price, rating, reviewsCount, image, badge, description, dataJson)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      fullData.title || '',
      fullData.destinationName || fullData.destination || '',
      fullData.days || 7,
      fullData.price || 0,
      fullData.rating || 5,
      fullData.reviewsCount || 0,
      Array.isArray(fullData.images) ? fullData.images[0] : fullData.image || '',
      fullData.type || '',
      fullData.overview || fullData.description || '',
      JSON.stringify(fullData)
    ]
  );
  res.status(201).json(fullData);
});

router.delete('/packages/:id', (req, res) => {
  runQuery('DELETE FROM packages WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

// Reviews
router.get('/reviews', (req, res) => {
  const rows = selectQuery('SELECT * FROM reviews');
  res.json(rows.map(formatRow));
});

router.post('/reviews', (req, res) => {
  const data = req.body;
  const id = data.id || `rev-${Date.now()}`;
  const fullData = { ...data, id, date: 'Just now', likes: 1 };
  runQuery(
    `INSERT INTO reviews (id, userName, userAvatar, rating, date, title, comment, likes, destination, dataJson)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      fullData.userName || 'Traveler',
      fullData.userAvatar || '',
      fullData.rating || 5,
      fullData.date,
      fullData.title || '',
      fullData.comment || '',
      fullData.likes || 1,
      fullData.destination || '',
      JSON.stringify(fullData)
    ]
  );
  res.status(201).json(fullData);
});

// Bookings
router.get('/bookings', (req, res) => {
  const rows = selectQuery('SELECT * FROM bookings');
  res.json(rows.map(formatRow));
});

router.post('/bookings', (req, res) => {
  const data = req.body;
  const id = data.id || `bkg-${Date.now()}`;
  const fullData = {
    ...data,
    id,
    status: data.status || 'Confirmed',
    createdAt: new Date().toISOString()
  };
  runQuery(
    `INSERT INTO bookings (id, title, amount, guests, date, status, userName, userEmail, paymentMethod, createdAt, dataJson)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      fullData.title || 'Travel Package',
      fullData.amount || 0,
      fullData.guests || 1,
      fullData.date || new Date().toISOString().split('T')[0],
      fullData.status,
      fullData.userName || 'Guest',
      fullData.userEmail || '',
      fullData.paymentMethod || 'Card',
      fullData.createdAt,
      JSON.stringify(fullData)
    ]
  );
  res.status(201).json(fullData);
});

router.put('/bookings/:id/status', (req, res) => {
  const { status } = req.body;
  const rows = selectQuery('SELECT * FROM bookings WHERE id = ?', [req.params.id]);
  if (rows.length > 0) {
    const b = formatRow(rows[0]);
    b.status = status;
    runQuery('UPDATE bookings SET status = ?, dataJson = ? WHERE id = ?', [status, JSON.stringify(b), req.params.id]);
    res.json(b);
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});

export default router;
