const socket = io('ws://10.32.240.19:3000');

socket.on('message', text => {
    const p = document.createElement('p');
    p.innerHTML = "Guest";

    const el = document.createElement('li');
    el.innerHTML = text;

    const chatWindow = document.querySelector('.chat-container ul');
    chatWindow.appendChild(p);
    chatWindow.appendChild(el);

    // Scroll the chat-container after the new message is appended
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