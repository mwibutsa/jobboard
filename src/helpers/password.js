import bcrypt from 'bcrypt';

/**
 * @author Mwibutsa Floribert
 * @param {string} password
 * @returns {Promise<string>} hashedPassword
 */
export const hashPassword = async (password) => {
  const saltRounds = 10;
  const saltString = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, saltString);
  return hashedPassword;
};

/**
 * @author Mwibutsa Floribert
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>} comparison result
 */
export const comparePasswords = async (plainPassword, hashedPassword) => {
  const result = await bcrypt.compare(plainPassword, hashedPassword);
  return result;
};
