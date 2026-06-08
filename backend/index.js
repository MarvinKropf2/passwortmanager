require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Basic Security Headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
});

const authController = require('./controllers/authController');

// Routes
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'SecurePass API is running' });
});

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
