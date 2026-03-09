const socketio = require('socket.io');

const socketHandler = (server) => {
    const io = socketio(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`New Socket Connection: ${socket.id}`);

        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined their notification room`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;
};

module.exports = socketHandler;
