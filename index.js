var colors = require('colors');
var Serial = require("serialport");
var telemetry = require("./lib/telemetry");
var parser = require("./lib/parser");
var writer = require("./lib/writer");

var serialPort = new Serial("COM5", {
    baudRate: 57600,
    parser: Serial.parsers.readline('\n')
});

serialPort.on('data', function (serialData) {

    process.emit('serial-data', parser.parseMessage(serialData.toString()));

});

serialPort.on('disconnect', function () {

    console.log("[SERIAL CONNECTION] La connexion série vient d'être déconnecté ! ".red);
    process.exit(1);

});

