var 
	http = require('http'),
	io = require('socket.io'),
	models = require('./models.js');

server = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('Server is up...');
});

server.listen(3000);

var chatters = Array();

var socket = io.listen(server);
socket.on('clientConnect', function(client) {
});

socket.on('clientMessage', function(message, client) {
	console.log('Received:');
	console.log(message);
	switch (message.command) {
		case 'join' : {
			handleJoin(client, message.payload.name);
		} break;
		case 'chat' : {
			handleChat(null, message.payload.chatMessage);
		} break;
	}
});

function handleJoin(client, name) {
	chatters.push({client:client, name:name});
	
	var m = new models.message();
	m.command = 'join-response';
	m.payload = new models.joinResponsePayload();
	m.payload.welcome = 'Welcome ' + name + '!';
	client.send(m);
}

function handleChat(chatter, message) {
	var m = new models.message();
	m.command = 'chat-broadcast';
	m.payload = new models.chatBroadcastPayload();
	m.payload.chatMessage = 'Someone said: ' + message; 
	for (var i = 0 ; i < chatters.length ; ++i) {
	var c = chatters[i];
	console.log(c);
		c.client.send(m);
		console.log('Sent:');
		console.log(m);
	}
}
