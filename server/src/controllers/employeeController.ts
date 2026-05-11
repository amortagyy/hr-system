import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const employeeController = {
  async getAll(req: Request, res: Response) {
    try {
      const { companyId } = req.query;

      const employees = await prisma.employee.findMany({
        where: {
          companyId: companyId as string,
        },
        include: {
          user: true,
          department: true,
          attendance: {
            where: {
              date: {
                gte: new Date(new Date().setDate(new Date().getDate() - 30)),
              },
            },
          },
        },
      });

      res.json({ employees });
    } catch (error) {
      console.error('Get employees error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const employee = await prisma.employee.findUnique({
        where: { id },
        include: {
          user: true,
          department: true,
          attendance: true,
          leaves: true,
          payroll: true,
        },
      });

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      res.json({ employee });
    } catch (error) {
      console.error('Get employee error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { userId, employeeCode, firstName, lastName, departmentId, companyId, designation, joinDate, salary } = req.body;

      const employee = await prisma.employee.create({
        data: {
          userId,
          employeeCode,
          firstName,
          lastName,
          departmentId,
          companyId,
          designation,
          joinDate: new Date(joinDate),
          salary,
          baseSalary: salary,
          status: 'active',
        },
        include: {
          user: true,
          department: true,
        },
      });

      res.status(201).json({ employee });
    } catch (error) {
      console.error('Create employee error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      const employee = await prisma.employee.update({
        where: { id },
        data,
        include: {
          user: true,
          department: true,
        },
      });

      res.json({ employee });
    } catch (error) {
      console.error('Update employee error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
