import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET_KEY } = process.env;

export const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET_KEY);
  return token;
};

export const verifyToken = (token) => {
  const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
  return decodedToken;
};
