
var colors = require('colors');
var Serial = require("serialport");
var telemetry = require("./lib/telemetry");
var healthCheck = require("./lib/health");
var parser = require("./lib/parser");

var serialPort = new Serial("/dev/ttyUSB0", {baudRate: 57600});

serialPort.on('open', function(){

    console.log("[SERIAL CONNECTION] Connexion série établie : ".green);

});

serialPort.on('data', function(serialData){

    console.log("[SERIAL CONNECTION] Nouvelle donnée reçue : ".green, serialData.bold.green);

});

serialPort.on('error', function(serialError){

    if(serialError.toString() == "Error: Error: No such file or directory, cannot open /dev/ttyUSB0"){

        console.log("[SERIAL CONNECTION] le port série n'a pas été trouvé ? Est-ce que vous l'avez branché ?".bold.red);

    }else{

        console.log("[SERIAL CONNECTION] Erreur de la connexion série : ".red, serialError.toString().bold.red);
        process.exit(1);

    }

});

serialPort.on('disconnect', function(){

   console.log("[SERIAL CONNECTION] La connexion série vient d'être déconnecté ! ".red);

});