import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'database.sqlite');

let SQL;
let db;

export async function initDB() {
  if (db) return db;

  SQL = await initSqlJs();

  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      uid TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT,
      fullName TEXT,
      username TEXT,
      phone TEXT,
      role TEXT,
      plan TEXT,
      joinedDate TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS destinations (
      id TEXT PRIMARY KEY,
      title TEXT,
      location TEXT,
      price REAL,
      rating REAL,
      reviews INTEGER,
      image TEXT,
      category TEXT,
      badge TEXT,
      description TEXT,
      dataJson TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS packages (
      id TEXT PRIMARY KEY,
      title TEXT,
      destination TEXT,
      days INTEGER,
      price REAL,
      rating REAL,
      reviewsCount INTEGER,
      image TEXT,
      badge TEXT,
      description TEXT,
      dataJson TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      userName TEXT,
      userAvatar TEXT,
      rating REAL,
      date TEXT,
      title TEXT,
      comment TEXT,
      likes INTEGER,
      destination TEXT,
      dataJson TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      title TEXT,
      amount REAL,
      guests INTEGER,
      date TEXT,
      status TEXT,
      userName TEXT,
      userEmail TEXT,
      paymentMethod TEXT,
      createdAt TEXT,
      dataJson TEXT
    );
  `);

  saveToDisk();
  await seedInitialData();
  return db;
}

export function saveToDisk() {
  if (!db) return;
  try {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  } catch (err) {
    console.error('Error saving SQLite database to disk:', err);
  }
}

async function seedInitialData() {
  // Seed Master Admin User if not exists
  const adminCheck = selectQuery("SELECT * FROM users WHERE email = 'admin@gmail.com'");
  if (adminCheck.length === 0) {
    const hashedPass = await bcrypt.hash('admin@123', 10);
    runQuery(
      `INSERT INTO users (id, uid, email, password, fullName, username, phone, role, plan, joinedDate)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'usr-admin-101',
        'usr-admin-101',
        'admin@gmail.com',
        hashedPass,
        'Master Admin',
        'admin',
        '+1 800 WANDERLUXE',
        'admin',
        'Enterprise VIP',
        new Date().toISOString()
      ]
    );
    console.log('[SQLite] Master Admin user seeded successfully.');
  }

  // Seed sample destinations if empty
  const destCheck = selectQuery("SELECT * FROM destinations");
  if (destCheck.length === 0) {
    const initialDestinations = [
      {
        id: 'dest-1',
        name: 'Bali Ultimate Tropical Escape',
        country: 'Indonesia',
        location: 'Bali, Indonesia',
        price: 1450,
        category: 'Beach',
        ratings: 4.9,
        reviewsCount: 320,
        images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
        description: 'Experience crystal clear turquoise lagoons, sacred Hindu temples in Ubud, private pool villas, and unforgettable beachfront dining in Seminyak.'
      },
      {
        id: 'dest-2',
        name: 'Santorini Romantic Cliffside Suite',
        country: 'Greece',
        location: 'Oia, Santorini',
        price: 2400,
        category: 'Honeymoon',
        ratings: 5.0,
        reviewsCount: 410,
        images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80'],
        description: 'Iconic whitewashed cave suites with private heated infinity plunge pools overlooking the sparkling Aegean caldera at sunset.'
      },
      {
        id: 'dest-3',
        name: 'Kyoto Imperial Shinto Experience',
        country: 'Japan',
        location: 'Kyoto & Tokyo, Japan',
        price: 2200,
        category: 'Pilgrimage',
        ratings: 4.9,
        reviewsCount: 280,
        images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80'],
        description: 'Immerse in timeless Shinto shrines, walk through the Fushimi Inari torii gates, participate in authentic tea ceremonies, and ride 1st class Shinkansen.'
      }
    ];

    for (const d of initialDestinations) {
      runQuery(
        `INSERT INTO destinations (id, title, location, price, rating, reviews, image, category, description, dataJson)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          d.id,
          d.name,
          d.location,
          d.price,
          d.ratings,
          d.reviewsCount,
          d.images[0],
          d.category,
          d.description,
          JSON.stringify(d)
        ]
      );
    }
  }

  // Seed sample bookings if empty
  const bookingsCheck = selectQuery("SELECT * FROM bookings");
  if (bookingsCheck.length === 0) {
    const initialBookings = [
      {
        id: 'bkg-101',
        title: 'Bali Ultimate Tropical Escape',
        amount: 2900,
        guests: 2,
        date: '2026-08-15',
        status: 'Confirmed',
        userName: 'Sarah Jenkins',
        userEmail: 'sarah@gmail.com',
        paymentMethod: 'Razorpay SSL',
        createdAt: new Date().toISOString()
      },
      {
        id: 'bkg-102',
        title: 'Santorini Romantic Cliffside Suite',
        amount: 2400,
        guests: 2,
        date: '2026-09-01',
        status: 'Confirmed',
        userName: 'Alexander Sterling',
        userEmail: 'alex@wanderluxe.com',
        paymentMethod: 'Razorpay SSL',
        createdAt: new Date().toISOString()
      }
    ];

    for (const b of initialBookings) {
      runQuery(
        `INSERT INTO bookings (id, title, amount, guests, date, status, userName, userEmail, paymentMethod, createdAt, dataJson)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          b.id,
          b.title,
          b.amount,
          b.guests,
          b.date,
          b.status,
          b.userName,
          b.userEmail,
          b.paymentMethod,
          b.createdAt,
          JSON.stringify(b)
        ]
      );
    }
  }

  saveToDisk();
}

export function runQuery(sql, params = []) {
  if (!db) throw new Error('Database not initialized');
  db.run(sql, params);
  saveToDisk();
}

export function selectQuery(sql, params = []) {
  if (!db) throw new Error('Database not initialized');
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}
