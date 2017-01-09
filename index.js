
var colors = require('colors');
var Serial = require("serialport");
var telemetry = require("./lib/telemetry");
var healthCheck = require("./lib/health");
var parser = require("./lib/parser");

Serial.list(function (err, testingPorts) {

    testingPorts.forEach(function(port) {
	
        var serialPort = new Serial(port.comName, {
            baudRate: 57600,
            parser: Serial.parsers.readline('\n')
        });

        var verificationTimeout = setTimeout(function(){

            serialPort.on('data', function(serialData){

                if (serialData.toString().search("/MODULE FEUX DE SIGNALISATION/g")) {

                    clearTimeout(verificationTimeout);

                    console.log("[SERIAL CONNECTION] Nouvelle donnée reçue : ".green, serialData.toString().bold.green);

                    process.emit('serial-data', parser.parseMessage(serialData.toString()));

                    serialPort.on('disconnect', function(){

                        console.log("[SERIAL CONNECTION] La connexion série vient d'être déconnecté ! ".red);

                    });

                }else{

                    serialPort.close();

                }
            });

        }, 2500);

    });

});
