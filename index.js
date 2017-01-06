
var Serial = require("serialport");
var colors = require('colors');
var telemetry = require("./lib/telemetry");
var parser = require("./lib/parser");
var healthCheck = require("./lib/health");

var serialPort = new Serial("/dev/ttyUSB0", {baudRate: 57600});

serialPort.on('open', function(){

    console.log("[SERIAL CONNECTION] Connexion série établie : ".green);

});

serialPort.on('data', function(serialData){

    console.log("[SERIAL CONNECTION] Nouvelle donnée reçue : ".green, serialData.bold.green);

});

serialPort.on('error', function(serialError){

    console.log("[SERIAL CONNECTION] Erreur de la connexion série : ".red, serialError.toString().bold.red);

});

//UNIQUEMENT POUR LE TEST

console.log(parser.parseMessage("63F01 42"));