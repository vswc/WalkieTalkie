
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${message}` );   
    });
});

http.listen(3000, '10.32.240.19', () => console.log('listening on http://10.32.240.19:3000/ws/app/index.html'));
