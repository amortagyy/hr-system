import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'secret-key',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  databaseUrl: process.env.DATABASE_URL,
};
