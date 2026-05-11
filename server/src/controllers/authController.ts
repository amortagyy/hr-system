import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, companyId, role = 'employee' } = req.body;

      // Validate input
      if (!name || !email || !password || !companyId) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          companyId,
          role,
        },
      });

      // Generate token
      const token = generateToken(user.id, user.role);

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          company: true,
          employee: true,
        },
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isValidPassword = await comparePassword(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate token
      const token = generateToken(user.id, user.role);

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
          employee: user.employee,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async me(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        include: {
          company: true,
          employee: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
          employee: user.employee,
        },
      });
    } catch (error) {
      console.error('Me error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
