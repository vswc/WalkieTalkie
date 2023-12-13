const socket = io('ws://<IP_HERE>:3000');

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

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    const p = document.createElement('p');
    p.innerHTML = `${timeString}`;

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
    if (text.trim() === "") {
        return;
    }
    socket.emit('message', text)
    document.querySelector('input').value = '';
    
}

document.querySelector('input').onkeydown = (e) => {
    if (e.key === 'Enter') {
        const text = document.querySelector('input').value;
        if (text.trim() === "") {
            return;
        }
        socket.emit('message', text)
        document.querySelector('input').value = '';
    }
}