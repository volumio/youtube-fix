var io = require('socket.io-client');

var socket = io.connect('http://192.168.1.95:3000');


socket.on('connect', function() {
	console.log('Device found');
	console.log('Uninstalling Youtube Plugins');
	socket.emit('unInstallPlugin', {'category':'music_service','name':'youtube2'});
	socket.emit('unInstallPlugin', {'category':'music_service','name':'ytmusic'});
});
