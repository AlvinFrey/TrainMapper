var fs = require('fs');
var dateFormat = require('dateformat');
var colors = require('colors');

var file = "";

var log = function(message, type = 0, save = true) {
    var date = "[" + dateFormat(new Date(), "HH:MM:ss") + "] ";
    var header = "[";
    if (type == 0)
        header += "INFO";
    else if (type == 1)
        header += "ERROR";
    else
        header += "WARNING";
    header += "] ";
    var final = date + header + message;

    if (type == 0)
        console.log(final.white);
    else if (type == 1)
        console.log(final.red);
    else if (type == 2)
        console.log(final.yellow);

    if (save)
        fs.appendFile(file, final + "\r\n");
};

var startLogger = function() {
    file = "logs/ " + dateFormat(new Date(), "dd-M-yyyy HH-MM-ss") + ".log";
    fs.open(file, 'w+', function(err) {
        if (err) {
            return console.error(err);
        }
        log("Le logger s'est lancé avec succès !", 0, false);
    });
};

module.exports = {
    startLogger: startLogger,
    log: log
};
