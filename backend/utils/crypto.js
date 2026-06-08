const crypto = require('crypto');
const bcrypt = require('bcrypt');

/**
 * Hashing des Master-Passworts
 */
async function hashMasterPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
}

async function verifyMasterPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

/**
 * AES-256-GCM Verschlüsselung
 */
const ENCRYPTION_ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const AUTH_TAG_LENGTH = 16;

function encrypt(text, masterKey) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const salt = crypto.randomBytes(SALT_LENGTH);
    
    // Key-Ableitung (PBKDF2)
    const key = crypto.pbkdf2Sync(masterKey, salt, 100000, 32, 'sha256');
    
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag().toString('hex');
    
    // Pack alles zusammen: salt + iv + authTag + encryptedText
    return `${salt.toString('hex')}:${iv.toString('hex')}:${authTag}:${encrypted}`;
}

function decrypt(cipherText, masterKey) {
    const [saltHex, ivHex, authTagHex, encryptedText] = cipherText.split(':');
    
    const salt = Buffer.from(saltHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    const key = crypto.pbkdf2Sync(masterKey, salt, 100000, 32, 'sha256');
    
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
}

module.exports = {
    hashMasterPassword,
    verifyMasterPassword,
    encrypt,
    decrypt
};
