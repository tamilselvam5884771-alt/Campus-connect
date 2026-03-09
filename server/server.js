const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/db');
const socketHandler = require('./socket/socketHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const server = http.createServer(app);

// Initialize Socket.io
const io = socketHandler(server);

// Make io accessible in controllers
app.set('socketio', io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
