require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');

const app = express();
const JWT_SECRET = 'your-secret-key'; // In production, this should be in environment variables

// Middleware
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:555',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../client/build')));

// Simple file-based storage
const DB_FILE = path.join(__dirname, 'db.json');

// Initialize database file if it doesn't exist
async function initDB() {
    try {
        await fs.access(DB_FILE);
    } catch {
        const initialData = {
            users: [],
            hotels: [
                {
                    id: 1,
                    name: "Luxury Palace Hotel",
                    description: "Experience ultimate luxury in our 5-star hotel with breathtaking city views.",
                    location: "Downtown City Center",
                    price: 300,
                    rating: 4.8,
                    images: [
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                    ],
                    availableRooms: 50
                },
                {
                    id: 2,
                    name: "Seaside Resort & Spa",
                    description: "Relax in our beachfront resort featuring private beach access.",
                    location: "Coastal Boulevard",
                    price: 250,
                    rating: 4.6,
                    images: [
                        "https://images.unsplash.com/photo-1571896349842-33c89424de2d"
                    ],
                    availableRooms: 40
                },
                {
                    id: 3,
                    name: "Mountain View Lodge",
                    description: "A cozy mountain retreat with stunning views.",
                    location: "Mountain Range",
                    price: 180,
                    rating: 4.5,
                    images: [
                        "https://images.unsplash.com/photo-1517320964276-a002fa203177"
                    ],
                    availableRooms: 30
                },
                {
                    id: 4,
                    name: "Business Elite Hotel",
                    description: "Perfect for business travelers with modern facilities.",
                    location: "Business District",
                    price: 220,
                    rating: 4.7,
                    images: [
                        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
                    ],
                    availableRooms: 45
                }
            ],
            bookings: []
        };
        await fs.writeFile(DB_FILE, JSON.stringify(initialData, null, 2));
    }
}

// DB operations
async function readDB() {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
}

async function writeDB(data) {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// API Routes
app.get('/api/auth/check', authenticateToken, (req, res) => {
    res.json(req.user);
});

app.get('/api/hotels', async (req, res) => {
    try {
        const db = await readDB();
        res.json(db.hotels);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/hotels/:id', async (req, res) => {
    try {
        const db = await readDB();
        const hotel = db.hotels.find(h => h.id === parseInt(req.params.id));
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/hotels/:id/book', authenticateToken, async (req, res) => {
    try {
        const db = await readDB();
        const hotel = db.hotels.find(h => h.id === parseInt(req.params.id));
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        
        const booking = {
            id: db.bookings.length + 1,
            hotelId: hotel.id,
            userId: req.user.id,
            ...req.body,
            status: 'confirmed',
            createdAt: new Date().toISOString()
        };
        
        db.bookings.push(booking);
        await writeDB(db);
        
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const db = await readDB();
        
        if (db.users.find(u => u.email === email)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = { 
            id: db.users.length + 1, 
            name, 
            email, 
            password,
            createdAt: new Date().toISOString()
        };
        
        db.users.push(newUser);
        await writeDB(db);
        
        // Create token
        const { password: _, ...userWithoutPassword } = newUser;
        const token = jwt.sign(userWithoutPassword, JWT_SECRET, { expiresIn: '24h' });
        
        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = await readDB();
        
        const user = db.users.find(u => u.email === email && u.password === password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create token
        const { password: _, ...userWithoutPassword } = user;
        const token = jwt.sign(userWithoutPassword, JWT_SECRET, { expiresIn: '24h' });
        
        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.json({ 
            message: 'Login successful',
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

// Serve React App for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Initialize database and start server
const PORT = 555;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

initDB().catch(err => {
    console.error('Failed to initialize database:', err);
});
