import fs from 'fs';
import path from 'path';
import Course from '../models/Course.js';

const fileUrl = (f) => (f ? '/uploads/' + f.filename : undefined);
const removeFile = (url) => url && fs.unlink(path.join(process.cwd(), url), () => {});
const withTeacher = (q) => q.populate('teacher', 'name email');

export const getCourses = async (req, res) => {
  const { q, category } = req.query;
  const filter = {};
  if (q) filter.title = { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
  if (category) filter.category = category;
  res.json(await withTeacher(Course.find(filter).sort('-createdAt')));
};

export const getMine = async (req, res) =>
  res.json(await withTeacher(Course.find({ teacher: req.user._id }).sort('-createdAt')));

export const getCourse = async (req, res) => {
  const course = await withTeacher(Course.findById(req.params.id));
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};

export const createCourse = async (req, res) => {
  const video = req.files?.video?.[0];
  if (!video) return res.status(400).json({ message: 'Video file is required' });
  const { title, description, category } = req.body;
  const course = await Course.create({
    title, description, category,
    teacher: req.user._id,
    videoUrl: fileUrl(video),
    thumbnail: fileUrl(req.files?.thumbnail?.[0]) || ''
  });
  res.status(201).json(course);
};

const ownCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  if (!course.teacher.equals(req.user._id)) return res.status(403).json({ message: 'This is not your course' });
  return course;
};

export const updateCourse = async (req, res) => {
  const course = await ownCourse(req, res);
  if (!course) return;
  const { title, description, category } = req.body;
  Object.assign(course, { title, description, category });
  const video = req.files?.video?.[0], thumb = req.files?.thumbnail?.[0];
  if (video) { removeFile(course.videoUrl); course.videoUrl = fileUrl(video); }
  if (thumb) { removeFile(course.thumbnail); course.thumbnail = fileUrl(thumb); }
  res.json(await course.save());
};

export const deleteCourse = async (req, res) => {
  const course = await ownCourse(req, res);
  if (!course) return;
  removeFile(course.videoUrl);
  removeFile(course.thumbnail);
  await course.deleteOne();
  res.json({ message: 'Course deleted' });
};
