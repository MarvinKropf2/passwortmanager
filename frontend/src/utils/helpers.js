/**
 * Sicherer Passwort-Generator
 */
export const generatePassword = (length = 16, options = {
    upper: true,
    lower: true,
    numbers: true,
    special: true
}) => {
    const charSets = {
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lower: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let allowedChars = '';
    if (options.upper) allowedChars += charSets.upper;
    if (options.lower) allowedChars += charSets.lower;
    if (options.numbers) allowedChars += charSets.numbers;
    if (options.special) allowedChars += charSets.special;

    if (allowedChars.length === 0) return '';

    let password = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        password += allowedChars.charAt(array[i] % allowedChars.length);
    }

    return password;
};

/**
 * Analyse der Passwortstärke
 */
export const checkStrength = (password) => {
    let score = 0;
    if (!password) return 'Keine Eingabe';

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 2) return 'schwach';
    if (score < 4) return 'mittel';
    return 'stark';
};
