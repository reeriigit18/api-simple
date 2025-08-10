// controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/prisma';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        // role: role || 'USER',
      },
    });

    res.status(201).json({ message: 'User registered', user: { id: user.id, email: user.email} });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    return res.json({ message: 'Logged in', user: req.user });
  }
  res.status(401).json({ error: 'Unauthorized' });
};

export const logout = (req: Request, res: Response) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out' });
  });
};

export const getCurrentUser = (req: Request, res: Response) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Unauthorized' });
  res.json(req.user);
};
