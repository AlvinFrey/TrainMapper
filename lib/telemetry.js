
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var pm2Health = require('pm2-check-express');

var webServerPort = 1250;

var rootPath = __dirname.replace("lib", "");

server.listen(webServerPort).on('error', function (err){

    if(err["code"]=="EADDRINUSE"){

        console.log("[WEB SERVER] Impossible de lancer le serveur web car le port est déjà utilisé".red);
        process.exit(1);

    }else{

        console.log("[WEB SERVER] Impossible de lancer le serveur web".red);
        process.exit(1);

    }

});

console.log("[WEB SERVER] Le serveur web vient d'être lancé sur le port : ".green, webServerPort.toString().bold.green);

pm2Health(app, {
    healthUrl: '/_health',
    statsUrl: '/_stats',
    timestampFormat: 'DD/MM/YY hh:mm:ss a'
});

app.get('/', function (req, res) {
    res.sendFile(__dirname.replace("lib", "") + '/web/index.html');
});

app.use('/public', express.static(path.join(rootPath + '/web/public')));

io.on('connection', function (socket){

    var ip = socket.handshake.address;

    console.log("[WEB SERVER] Nouveau client connecté (".green, ip.toString().bold.green, ")".green);

    process.on('serial-data', function(serialData){

        socket.emit('serial-data', serialData);

    });

});