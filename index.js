
var colors = require('colors');
var Serial = require("serialport");
var telemetry = require("./lib/telemetry");
var parser = require("./lib/parser");

Serial.list(function (err, testingPorts) {

    testingPorts.forEach(function(port) {

        if(port.vendorId=="0x0403"){

            var serialPort = new Serial(port.comName, {
                baudRate: 57600,
                parser: Serial.parsers.readline('\n')
            });

            serialPort.on('data', function(serialData){

                process.emit('serial-data', parser.parseMessage(serialData.toString()));

            });

            serialPort.on('disconnect', function() {

                console.log("[SERIAL CONNECTION] La connexion série vient d'être déconnecté ! ".red);
                process.exit(1);

            });

        }

    });

});
