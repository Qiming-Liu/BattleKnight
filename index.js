const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const io = socketIO(server, {pingTimeout: 10000});
const port = 5000;

app.set('port', port);
app.use(express.static(__dirname + '/public'));

let players = {};
io.on('connection', socket => {
});

server.listen(port);