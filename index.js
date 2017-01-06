
var colors = require('colors');
var serial = require("serialport");
var telemetry = require("./lib/telemetry");
var healthCheck = require("./lib/health");

var serialPort = new serial("/dev/ttyUSB0", {baudRate: 57600});

serialPort.on('open', function(){

    console.log("[SERIAL CONNECTION] Connexion série établie : ".green);

});

serialPort.on('data', function(serialData){

    console.log("[SERIAL CONNECTION] Nouvelle donnée reçue : ".green, serialData.bold.green);

});

serialPort.on('error', function(serialError){

    console.log("[SERIAL CONNECTION] Erreur de la connexion série : ".red, serialError.toString().bold.red);

});