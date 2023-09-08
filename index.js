const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// const path = require('path');

const APP_PORT = 5555;

// --- https://blog.devahoy.com/blog/2015/02/chat-app-with-nodejs-and-socket-io --- //
// ตั้งค่า เพื่อให้ express ทำการ render view ที่โฟลเดอร์ views
// และใช้ template engine เป็น pug
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.render('index');
// });
// --- https://blog.devahoy.com/blog/2015/02/chat-app-with-nodejs-and-socket-io --- //

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('hi');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

server.listen(APP_PORT, () => {
    console.log(`App running on port ${APP_PORT}`);
});