
var colors = require('colors');
var Serial = require("serialport");
var telemetry = require("./lib/telemetry");
var healthCheck = require("./lib/health");
var parser = require("./lib/parser");

Serial.list(function (err, testingPorts) {

    testingPorts.forEach(function(port) {

        var serialPort = new Serial(port.comName);

        serialPort.on('data', function(serialData){

            if (serialData.toString().search("/MODULE FEUX DE SIGNALISATION/g")) {

                console.log("c'est lui");

            }else{

                serialPort.close();

            }

        });

    });

});

/*serialPort.on('open', function(){

    console.log("[SERIAL CONNECTION] Connexion série établie : ".green);

});

serialPort.on('data', function(serialData){

    console.log("[SERIAL CONNECTION] Nouvelle donnée reçue : ".green, serialData.toString().bold.green);

    process.emit('serial-data', parser.parseMessage(serialData.toString()));

});

serialPort.on('error', function(serialError){

    if(serialError.toString().search("/Error: No such file or directory/g")){

        console.log("[SERIAL CONNECTION] Le port série n'a pas été trouvé ? Est-ce que vous l'avez branché ?".bold.red);

    }else{

        console.log("[SERIAL CONNECTION] Erreur de la connexion série : ".red, serialError.toString().bold.red);
        process.exit(1);

    }

});

serialPort.on('disconnect', function(){

   console.log("[SERIAL CONNECTION] La connexion série vient d'être déconnecté ! ".red);

});*/