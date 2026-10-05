function generatePassword(options = {}) {
  const {
    length = 12,
    lowercase = true,
    uppercase = true,
    numbers = true,
    symbols = true,
    customCharacters = ''
  } = options;

  if (length < 1) {
    throw new Error('Password length must be at least 1');
  }

  let characters = '';

  if (lowercase) {
    characters += 'abcdefghijklmnopqrstuvwxyz';
  }

  if (uppercase) {
    characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  if (numbers) {
    characters += '0123456789';
  }

  if (symbols) {
    characters += '!@#$%^&*()_+-=[]{}';
  }

  if (customCharacters) {
    characters += customCharacters;
  }

  if (characters.length === 0) {
    throw new Error('At least one character type must be enabled');
  }

  let password = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);
    password += characters[index];
  }

  return password;
}

module.exports = {
  generatePassword
};
