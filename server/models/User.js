import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['student', 'teacher'], default: 'student' },
  bio: { type: String, default: '' },
  phone: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
