const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 5000;

io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    socket.on('join-room', () => {
        const rooms = io.sockets.adapter.rooms;
        const roomID = Object.keys(rooms)[0] || socket.id;
        socket.join(roomID);

        const otherUsers = Object.keys(rooms[roomID].sockets).filter(id => id !== socket.id);
        if (otherUsers.length) {
            socket.emit('other-user', otherUsers[0]);
        }

        socket.on('sending-signal', payload => {
            io.to(payload.userId).emit('user-joined', payload.signal);
        });

        socket.on('returning-signal', payload => {
            io.to(payload.userId).emit('receiving-returned-signal', payload.signal);
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
