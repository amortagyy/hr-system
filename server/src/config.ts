import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const config = {
  port: parseInt(process.env.PORT || '5000'),
  nodeEnv: process.env.NODE_ENV || 'development',

  jwtSecret: requiredEnv('JWT_SECRET'),
  jwtExpire: process.env.JWT_EXPIRE || '7d',

  databaseUrl: requiredEnv('DATABASE_URL'),
};