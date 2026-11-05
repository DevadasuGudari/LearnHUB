
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();

// Check required environment variables
if (!process.env.JWT_SECRET) {
    console.error('Error: JWT_SECRET is missing in .env file');
    process.exit(1);
}

if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is missing in .env file');
    process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Home route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// API routes
app.use('/api/users', require('./routers/userRoutes'));
app.use('/api/courses', require('./routers/courseRoutes'));

const PORT = process.env.PORT || 8000;

// Connect database first, then start server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Server startup failed:', error.message);
        process.exit(1);
    }
};

startServer();

module.exports = app;