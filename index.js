var colors = require('colors');
var Serial = require("serialport");
var telemetry = require("./lib/telemetry");
var parser = require("./lib/parser");
var writer = require("./lib/writer");

Serial.list(function (err, ports) {
    ports.forEach(function (port) {
        if (port.vendorId == "0403") {
            var serialPort = new Serial(port.comName, {
                baudRate: 57600,
                parser: Serial.parsers.readline('\n')
            });


            serialPort.on('open', function () {

                console.log("[SERIAL CONNECTION] La connexion série vient de s'ouvrir sur le port : ".green + port.comName.green);

                setTimeout(function () {


                    serialPort.write(writer.createAction({
                        feux: true,
                        module1: true,
                        module2: true,
                        module3: true,
                        module4: true,
                        module5: true,
                        module6: true,
                        module7: true,
                        module8: true,
                        order1: 1,
                        order2: 1,
                        order3: 1,
                        order4: 1


                    }));

                }, 3000);
            });

            serialPort.on('data', function (serialData) {

                process.emit('serial-data', parser.parseMessage(serialData.toString()));

            });

            serialPort.on('disconnect', function () {

                console.log("[SERIAL CONNECTION] La connexion série vient d'être déconnecté ! ".red);
                process.exit(1);

            });
        }

    });
});
