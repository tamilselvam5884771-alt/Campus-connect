const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/campusconnect')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('Welcome to CampusConnect API');
});

// Import Routes
const itemsRoutes = require('./routes/issues');
const resourcesRoutes = require('./routes/resources');

app.use('/api/issues', itemsRoutes);
app.use('/api/resources', resourcesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
