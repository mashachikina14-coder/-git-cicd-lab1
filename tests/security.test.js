const { generatePassword } = require('../src/passwordGenerator');

describe('Password Generator Security Tests', () => {
  test('generates password with requested length', () => {
    const password = generatePassword({ length: 16 });

    expect(password).toHaveLength(16);
  });

  test('generates password with only lowercase letters', () => {
    const password = generatePassword({
      length: 20,
      lowercase: true,
      uppercase: false,
      numbers: false,
      symbols: false
    });

    expect(password).toMatch(/^[a-z]+$/);
  });

  test('generates password with numbers', () => {
    const password = generatePassword({
      length: 20,
      lowercase: false,
      uppercase: false,
      numbers: true,
      symbols: false
    });

    expect(password).toMatch(/^[0-9]+$/);
  });

  test('rejects invalid password length', () => {
    expect(() => generatePassword({ length: 0 }))
      .toThrow('Password length must be at least 1');
  });

  test('rejects password with no character types', () => {
    expect(() => generatePassword({
      length: 10,
      lowercase: false,
      uppercase: false,
      numbers: false,
      symbols: false
    })).toThrow('At least one character type must be enabled');
  });
});
const { checkPasswordStrength } = require('../src/strengthChecker');

describe('Password Strength Checker', () => {
  test('detects weak password', () => {
    expect(checkPasswordStrength('abc')).toBe('weak');
  });

  test('detects medium password', () => {
    expect(checkPasswordStrength('Password123')).toBe('medium');
  });

  test('detects strong password', () => {
    expect(checkPasswordStrength('StrongPassword123!')).toBe('strong');
  });

  test('rejects non-string password', () => {
    expect(() => checkPasswordStrength(123456))
      .toThrow('Password must be a string');
  });
});
describe('Custom password rules', () => {
  test('generates password using custom characters', () => {
    const password = generatePassword({
      length: 20,
      lowercase: false,
      uppercase: false,
      numbers: false,
      symbols: false,
      customCharacters: 'ABC123'
    });

    expect(password).toHaveLength(20);
    expect(password).toMatch(/^[ABC123]+$/);
  });

  test('generates password with custom symbols', () => {
    const password = generatePassword({
      length: 15,
      lowercase: false,
      uppercase: false,
      numbers: false,
      symbols: false,
      customCharacters: '!@#'
    });

    expect(password).toHaveLength(15);
    expect(password).toMatch(/^[!@#]+$/);
  });
});
