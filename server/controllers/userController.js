import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const send = (res, u, code = 200) =>
  res.status(code).json({
    token: sign(u._id),
    user: { _id: u._id, name: u.name, email: u.email, role: u.role, bio: u.bio, phone: u.phone, createdAt: u.createdAt }
  });

export const register = async (req, res) => {
  const { name, email, password, role, bio, phone } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
  if (!['student', 'teacher'].includes(role)) return res.status(400).json({ message: 'Choose Student or Teacher' });
  if (await User.findOne({ email: email.toLowerCase() })) return res.status(400).json({ message: 'Email already registered' });
  const user = await User.create({ name, email, role, bio, phone, password: await bcrypt.hash(password, 10) });
  send(res, user, 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || '').toLowerCase() });
  if (!user || !(await bcrypt.compare(password || '', user.password)))
    return res.status(401).json({ message: 'Invalid email or password' });
  send(res, user);
};

export const profile = (req, res) => res.json(req.user);
