
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var webServerPort = 1251;

server.listen(webServerPort);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/web/index.html');
});

io.on('connection', function (socket){

   console.log("[WEB SERVER] Nouveau client connecté".green);

});