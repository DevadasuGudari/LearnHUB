import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  description: { type: String, required: [true, 'Description is required'] },
  category: { type: String, required: [true, 'Category is required'], trim: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoUrl: { type: String, required: [true, 'Video is required'] },
  thumbnail: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
