var io = require('socket.io-client');


var mdns = require('mdns-js');
mdns.excludeInterface('0.0.0.0');
var browser = mdns.createBrowser();


var alreadyShownIPArray = [];
var intervalDetection = 500;

browser.on('ready', function () {
  browser.discover();
  setInterval(()=>{
    browser.discover();
  }, intervalDetection)
});

browser.on('update', function (data) {
    parseOutputData(data);
});


function parseOutputData(data) {
  for (var i in data.type) {
    if (data.type[i].name.includes('Volumio')) {
      connectAndUninstall(data);
    }
  }
}


function connectAndUninstall(data) {
	var ip = data.addresses[0];
	var deviceUrl = 'http://' + ip + ':3000';
	var socket = io.connect(deviceUrl);
	
	console.log('Connecting to ' + deviceUrl);


	socket.on('connect', function() {
		console.log('Device found');
		console.log('Uninstalling Youtube Plugins');
		socket.emit('unInstallPlugin', {'category':'music_service','name':'youtube2'});
		socket.emit('unInstallPlugin', {'category':'music_service','name':'ytmusic'});
	setTimeout(()=>{
		console.log('DONE, Please restart your device');
		}, 10000);
	});
}




