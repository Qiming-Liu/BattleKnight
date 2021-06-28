const express = require('express');
const app = express();
const server = require('http').Server(app);
const socketIO = require('socket.io');
const io = socketIO(server, {pingTimeout: 10000});
const port = 5000;

app.set('port', port);
app.use(express.static(__dirname + '/public'));

let room = {};
io.on('connection', socket => {
    console.log(socket.id + ' join game');

    socket.on('createRoom', roomNumber => {
        socket.on("disconnect", () => {
            io.to(roomNumber).emit('gameOver');
            if (room[roomNumber] !== undefined) {
                room[roomNumber] = undefined;
            }
        });

        if (room[roomNumber] === undefined) {
            room[roomNumber] = {
                left: '',
                right: '',
                finished: 0
            };
            room[roomNumber].left = socket.id;
            socket.join(roomNumber);
            socket.emit('room', 'created');
            console.log(socket.id + ' join in room left ' + roomNumber);
        } else {
            socket.emit('room', 'exist');
            console.log(socket.id + ' try room ' + roomNumber + ' already exist');
        }
    });

    socket.on('enterRoom', roomNumber => {
        socket.on("disconnect", () => {
            io.to(roomNumber).emit('gameOver');
            if (room[roomNumber] !== undefined) {
                room[roomNumber] = undefined;
            }
        });

        if (room[roomNumber] === undefined) {
            socket.emit('room', 'unexist');
            console.log(socket.id + ' try room' + roomNumber + ' no exist');
        } else {
            room[roomNumber].right = socket.id;
            socket.join(roomNumber);
            socket.emit('room', 'created');
            console.log(socket.id + ' join in room right ' + roomNumber);

            //game start
            io.to(room[roomNumber].left).emit('gameStart', {
                roomNumber: roomNumber,
                direction: 'left'
            });
            io.to(room[roomNumber].right).emit('gameStart', {
                roomNumber: roomNumber,
                direction: 'right'
            });
            console.log('room ' + roomNumber + ' game started');
        }
    });

    socket.on('finishLoading', roomNumber => {
        console.log(socket.id + ' in room ' + roomNumber + ' finished loading');
        room[roomNumber].finished++;
        if (room[roomNumber].finished === 2) {
            io.to(roomNumber).emit('allFinishLoading');
        }
    });

    socket.on('produce', piece => {
        io.to(piece.gameInfo.roomNumber).emit('produce', {
            key: piece.key,
            level: piece.level,
            direction: piece.gameInfo.direction
        });
    });
});

server.listen(port);