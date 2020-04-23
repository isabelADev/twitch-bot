const tmi = require('tmi.js');

// Define configuration options
const opts = {
    identity: {
    username: '',
    password: ''
},
    channels: [ '' ]
};

const commands = [
    { cmd: '!dia', fieldName: 'hp', value: '10'},
    { cmd: '!cafe', fieldName: 'mp', value: '10'}
];

class Message {
    fieldName;
    value;

    constructor(fieldName, value) {
        this.fieldName = fieldName;
        this.value = value;
    }
}

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
// Connect to Twitch:
client.connect();

// Init Websocket
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });

var websocket;

wss.on('connection', w => {
    websocket = w;
    console.log(`* Client Connected.`);
    // Called every time a message comes in
});

function onMessageHandler(target, context, msg, self) {
    if (self) {
        return;
    } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    commands.forEach(command => {
        if (commandName === command.cmd) {
            let msg = new Message(command.fieldName, command.value);
            websocket.send(JSON.stringify(msg));
            console.log("Message sent:");
            console.dir(msg);
        }
    });
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}