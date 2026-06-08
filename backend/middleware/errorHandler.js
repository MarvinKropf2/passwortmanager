const logger = require('../utils/logger');

/**
 * Globaler Error-Handler Middleware.
 * Verhindert das Ausgeben von Stack-Traces an den Client (OWASP A05:2021-Security Misconfiguration).
 */
const errorHandler = (err, req, res, next) => {
    // Protokolliere den Fehler sicher
    logger.error('Unerwarteter Serverfehler aufgetreten', {
        message: err.message,
        url: req.originalUrl,
        method: req.method
    });

    // Sende eine generische Fehlermeldung
    res.status(500).json({ error: 'Ein unerwarteter Serverfehler ist aufgetreten.' });
};

module.exports = errorHandler;
