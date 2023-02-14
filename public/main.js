const input = document.querySelector('#textarea')
const messages = document.querySelector('#messages')
const username = document.querySelector('#username')
const send = document.querySelector('#send')

const url = "ws://" + window.location.host + "/ws";
const ws = new WebSocket(url);

ws.onmessage = function (msg) {
    insertMessage(JSON.parse(msg.data))
}

send.onclick = () => {
    const message = {
        username: username.value,
        content: input.value,
    }

    ws.send(JSON.stringify(message));
    input.value = "";
};

function insertMessage(messageObject) {
    // Create a div object which will hold the message
    const message = document.createElement('div')

    // Set the attribute of the message div
    message.setAttribute('class', 'chat-message')
    console.log("name: "+ messageObject.username + "content: " + messageObject.content)

    message.textContent = `${messageObject.username}: ${messageObject.content}`

    // Append the message to our chat div
    messages.appendChild(message)

    // Insert the message as the first message of our chat
    messages.insertBefore(message, messages.firstChild)

}