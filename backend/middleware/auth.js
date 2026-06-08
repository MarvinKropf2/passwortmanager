const jwt = require('jsonwebtoken');

/**
 * Middleware zur Überprüfung des JSON Web Tokens (JWT).
 * Schützt Endpunkte vor unberechtigtem Zugriff (OWASP A01:2021-Broken Access Control).
 */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Format: "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Zugriff verweigert: Kein Token bereitgestellt.' });
    }

    const secret = process.env.SESSION_SECRET || 'fallback_secret';

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Zugriff verweigert: Ungültiges oder abgelaufenes Token.' });
        }
        
        // Füge Benutzer-Informationen zum Request hinzu
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
