/**
 * Sicherer Logger für das Schulprojekt.
 * Verhindert, dass sensible Daten wie Passwörter versehentlich in den Logs landen.
 */
const logger = {
    info: (message, data = {}) => {
        console.log(`[INFO] ${new Date().toISOString()}: ${message}`, sanitize(data));
    },
    error: (message, error = {}) => {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, sanitize(error));
    },
    warn: (message, data = {}) => {
        console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, sanitize(data));
    }
};

/**
 * Filtert sensible Felder aus Objekten heraus.
 */
function sanitize(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    const sanitized = { ...obj };
    const sensitiveFields = ['password', 'master_hash', 'token', 'encrypted_password', 'secret', 'key'];

    sensitiveFields.forEach(field => {
        if (field in sanitized) {
            sanitized[field] = '[REDACTED]';
        }
    });

    return sanitized;
}

module.exports = logger;
