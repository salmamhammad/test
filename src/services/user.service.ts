import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';
import 'dotenv/config';
const JWT_SECRET = process.env.JWT_SECRET!;

function parseBirthDate(value: unknown): Date {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error('birthDate is required and must be a valid date');
  }

  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? `${value}T00:00:00.000Z`
    : value;

  const birthDate = new Date(normalized);

  if (Number.isNaN(birthDate.getTime())) {
    throw new Error('birthDate must be a valid ISO date or YYYY-MM-DD');
  }

  return birthDate;
}

export const userService = {
  async register(data: any) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw new Error('Email already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const birthDate = parseBirthDate(data.birthDate);

    return userRepository.create({
      ...data,
      birthDate,
      password: hashedPassword,
    });
  },

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');
    if (!user.isActive) throw new Error("User is blocked");
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token };
  },

  async getById(requester: any, id: string) {
    if (requester.role !== 'ADMIN' && requester.id !== id) {
      throw new Error('Forbidden');
    }

    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },

  async getAll(requester: any) {
    if (requester.role !== 'ADMIN') {
      throw new Error('Forbidden');
    }

    return userRepository.findAll();
  },

  async blockUser(requester: any, id: string) {
    if (requester.role !== 'ADMIN' && requester.id !== id) {
      throw new Error('Forbidden');
    }

    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return userRepository.update(id, { isActive: false });
  },
};
