require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const reportRoutes = require('./routes/reports');
const resourceRoutes = require('./routes/resources');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve the uploads folder statically so frontend can access images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/reports', reportRoutes);
app.use('/api/resources', resourceRoutes);

// MongoDB Connection
// Note: In a real app, use an environment variable like process.env.MONGO_URI
const MONGO_URI = 'mongodb://127.0.0.1:27017/campus_connect_mini';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
