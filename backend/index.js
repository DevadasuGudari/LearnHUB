
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// Check required environment variables
if (!process.env.JWT_SECRET) {
    console.error('Error: JWT_SECRET is missing in .env file');
    process.exit(1);
}

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Placeholder routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', require('./routers/userRoutes'));
app.use('/api/courses', require('./routers/courseRoutes'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
