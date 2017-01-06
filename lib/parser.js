
exports.parseMessage = function(message) {


    var modules = [];
    var equipments = [];
    var equipmentsText = [];

    var identifier = message.split(' ')[0].substr(1);
    var data = message.split(' ')[1];

    var modulesBinary = reverseString(hex2Bin(identifier.charAt(2) + identifier.charAt(3)));
    var equipmentsBinary = reverseString(hex2Bin(identifier.charAt(0) + identifier.charAt(1)));

    for (var i = 0; i < modulesBinary.length; i++) {

        if (modulesBinary.charAt(i) == '1') {

            modules.push(i + 1);

        }

    }

    var equipmentsLabel = [
        'Aiguillages et Croisements',
        'Feux de Signalisation',
        'Locomotives',
        'Capteurs Optiques (Position)',
        'Boucles de Retournement',
        'Ponts Tournant'
    ];

    for (var i = 0; i < equipmentsBinary.length; i++) {

        if (equipmentsBinary.charAt(i) == '1') {

            equipments.push(i + 1);
            equipmentsText.push(equipmentsLabel[i]);

        }

    }

    return JSON.stringify({

        "equipments": equipments,
        "equipmentsText": equipmentsText,
        "modules": modules

    });

};

function hex2Bin(hex) {
    if (!checkHex(hex))return "0";
    return parseInt(hex, 16).toString(2);
}

function checkHex(hex) {
    return /^[0-9A-Fa-f]{1,64}$/.test(hex);
}

function reverseString(string) {
    return string.split("").reverse().join("");
}
