const socket = io('ws://10.32.240.19:3000');

function htmlspecialchars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

socket.on('message', text => {

    setInterval(() => {
        const start = Date.now();
    
        socket.emit("customPing", {}, () => {
            const duration = Date.now() - start;
            const h = document.querySelector('h1');
            h.innerHTML = `Websocket latency: ${duration} ms`;
        });
    }, 1000);

    const p = document.createElement('p');
    p.innerHTML = "Guest";

    const el = document.createElement('li');
    el.innerHTML = htmlspecialchars(text);

    const chatWindow = document.querySelector('.chat-container ul');
    chatWindow.appendChild(p);
    chatWindow.appendChild(el);

    const chatContainer = document.querySelector('.chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
});

document.querySelector('button').onclick = () => {

    const text = document.querySelector('input').value;
    if (text == null || text == "") {
        return;
    }
    socket.emit('message', text)
    document.querySelector('input').value = '';
    
}

document.querySelector('input').onkeydown = (e) => {
    if (e.key === 'Enter') {
        const text = document.querySelector('input').value;
        if (text == null || text == "") {
            return;
        }
        socket.emit('message', text)
        document.querySelector('input').value = '';
    }
}