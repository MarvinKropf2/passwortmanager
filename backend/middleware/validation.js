const logger = require('../utils/logger');

/**
 * Validiert die Registrierungs- und Login-Eingaben.
 */
const validateAuth = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || typeof username !== 'string' || username.trim().length < 3) {
        logger.warn('Validierungsfehler: Ungültiger Benutzername');
        return res.status(400).json({ error: 'Benutzername muss mindestens 3 Zeichen lang sein' });
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
        logger.warn('Validierungsfehler: Passwort zu kurz');
        return res.status(400).json({ error: 'Passwort muss mindestens 8 Zeichen lang sein' });
    }

    // Zusätzliche Checks (z.B. Sonderzeichen) könnten hier folgen
    next();
};

/**
 * Validiert die Passwort-Einträge.
 */
const validatePasswordEntry = (req, res, next) => {
    const { service, username, password } = req.body;

    if (!service || typeof service !== 'string' || service.trim().length === 0) {
        return res.status(400).json({ error: 'Service-Name ist erforderlich' });
    }

    if (!password || typeof password !== 'string' || password.trim().length === 0) {
        return res.status(400).json({ error: 'Passwort ist erforderlich' });
    }

    next();
};

module.exports = {
    validateAuth,
    validatePasswordEntry
};
