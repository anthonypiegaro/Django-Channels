const roomName = JSON.parse(document.getElementById('room-name').textContent);
const chatLog = document.getElementById("chat-log");

const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/chat/'
    + roomName
    + '/'
);

// chatSocket.onmessage = function(e) {
//     const data = JSON.parse(e.data);
//     document.querySelector('#chat-log').value += (data.message + '\n' + 'sent by ' + data.username + '\n');
// };
chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    const messageBlob = document.createElement("div")
    messageBlob.classList.add("message-blob");
    const messageDiv = document.createElement("div");
    const userDiv = document.createElement("div");
    messageDiv.classList.add("message");
    userDiv.classList.add("user");
    messageDiv.textContent = data.message;
    userDiv.textContent = ("sent by " + data.username)
    messageBlob.appendChild(messageDiv);
    messageBlob.appendChild(userDiv);
    chatLog.appendChild(messageBlob);
    chatLog.scrollTop = chatLog.scrollHeight;
};

chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#chat-message-submit').click();
    }
};

document.querySelector('#chat-message-submit').onclick = function(e) {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'message': message
    }));
    messageInputDom.value = '';
};