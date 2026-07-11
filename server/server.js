import express from 'express';
import cors from 'cors';
import { initDB } from './db.js';
import authRoutes from './routes/auth.js';
import travelRoutes from './routes/travel.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize SQLite3 Database
initDB().then(() => {
  console.log('[SQLite3] Database initialized successfully at server/database.sqlite');
}).catch((err) => {
  console.error('[SQLite3] Database initialization failed:', err);
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', travelRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'SQLite3' });
});

app.listen(PORT, () => {
  console.log(`[Server] WanderLuxe SQLite3 Backend running on http://localhost:${PORT}`);
});
