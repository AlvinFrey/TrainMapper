var colors = require('colors');
var Serial = require("serialport");
var telemetry = require("./lib/telemetry");
var parser = require("./lib/parser");
var writer = require("./lib/writer");

Serial.list(function (err, ports) {
    ports.forEach(function (port) {

        if (port.vendorId == "0403" || port.vendorId == 0x0403) {
            var serialPort = new Serial(port.comName, {
                baudRate: 57600,
                parser: Serial.parsers.readline('\n')
            });


            serialPort.on('open', function () {

                console.log("La connexion série vient de s'ouvrir sur le port : " + port.comName);

            });

            serialPort.on('data', function (serialData) {

                process.emit('serial-data', parser.parseMessage(serialData.toString()));

                process.on("light-switch", function (lightData){

                    console.log(lightData);

                    writer.createEasyAction("feu", lightData.id.charAt(0) + "." + lightData.id.charAt(1), lightData.state);

                });

            });

            serialPort.on('disconnect', function () {

                console.log("La connexion série vient d'être déconnecté ! ");
                process.exit(1);

            });
        }

    });
});

