const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

// Route files
const auth = require('./routes/auth');
const issues = require('./routes/issues');
const resources = require('./routes/resources');
const notifications = require('./routes/notifications');
const admin = require('./routes/admin');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser (optional, can add if needed later)

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Set security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Set static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use('/api/auth', auth);
app.use('/api/issues', issues);
app.use('/api/resources', resources);
app.use('/api/notifications', notifications);
app.use('/api/admin', admin);

// Error handling middleware (placeholder)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
});

module.exports = app;
