const db = require('../config/db');
const logger = require('../utils/logger');
const { hashMasterPassword, verifyMasterPassword } = require('../utils/crypto');

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username und Passwort erforderlich' });
    }

    try {
        const hash = await hashMasterPassword(password);

        db.run(
            `INSERT INTO users (username, master_hash) VALUES (?, ?)`,
            [username, hash],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        logger.warn('Registrierung fehlgeschlagen: Benutzername existiert bereits', { username });
                        return res.status(400).json({ error: 'Benutzername existiert bereits' });
                    }
                    logger.error('Datenbankfehler bei Registrierung', err);
                    return res.status(500).json({ error: 'Datenbankfehler' });
                }
                logger.info('Neuer Benutzer registriert', { username });
                res.status(201).json({ message: 'Benutzer erfolgreich registriert' });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Serverfehler' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    db.get(
        `SELECT * FROM users WHERE username = ?`,
        [username],
        async (err, user) => {
            if (err) return res.status(500).json({ error: 'Datenbankfehler' });
            if (!user) return res.status(401).json({ error: 'Ungültige Anmeldedaten' });

            const match = await verifyMasterPassword(password, user.master_hash);
            if (!match) return res.status(401).json({ error: 'Ungültige Anmeldedaten' });

            // Hier würde normalerweise ein JWT generiert werden
            res.json({
                message: 'Login erfolgreich',
                user: { id: user.id, username: user.username }
            });
        }
    );
};

module.exports = { register, login };
