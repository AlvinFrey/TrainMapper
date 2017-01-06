
var healthPort = 1250;

var isHealthy = require('health-check-library/javascript/pure')(healthPort, function onListening(){

    isHealthy(true);

    console.log("[HEALTH API] L'API Health vient de démarrer sur le port : ".green + healthPort.toString().bold.green);

});