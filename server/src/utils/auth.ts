import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcryptjs.compare(password, hashedPassword);
};

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
