
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('\nUSER CONNECTED\n');

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${message}` );   
    });
});

io.on('connection', (socket) => {
    socket.on('customPing', (data, callback) => {
        callback();
    });
});

http.listen(3000, '<IP_HERE>', () => console.log('listening on http://localhost/ws/app/index.html') );