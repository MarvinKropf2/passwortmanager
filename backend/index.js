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
const { validateAuth } = require('./middleware/validation');
const { authenticateToken } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

// Routes
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'SecurePass API is running' });
});

app.post('/api/register', validateAuth, authController.register);
app.post('/api/login', validateAuth, authController.login);

// Protected Test Route
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Zugriff auf geschützte Daten erfolgreich!', user: req.user });
});

// Global Error Handler (must be registered after routes)
app.use(errorHandler);

const logger = require('./utils/logger');

app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});
