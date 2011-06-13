exports.message = function() {
	this.command = '';
	this.payload = null;
};

exports.joinPayload = function() {
	this.name = '';
};

exports.joinResponsePayload = function() {
	this.welcome = '';
};

exports.chatBroadcastPayload = function() {
	this.chatMessage = '';
};
