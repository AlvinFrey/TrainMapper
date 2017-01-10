var equipmentsLabel = [
    'Aiguillages et Croisements',
    'Feux de Signalisation',
    'Locomotives',
    'Capteurs Optiques (Position)',
    'Boucles de Retournement',
    'Ponts Tournant'
];

exports.parseMessage = function (message) {

    if (message.toString().charAt(0) == "6" && message.toString().length > 4) {

        message = message.toString().trim();

        console.log("[SERIAL CONNECTION] Nouvelle donnée reçue : ".green, message.toString().bold.green);

        var modules = [];
        var equipments = [];
        var equipmentsText = [];

        var identifier = message.split(' ')[0].substr(1);
        var data = message.split(' ')[1];

        var modulesBinary = reverseString(hex2Bin(identifier.charAt(2) + identifier.charAt(3)));
        var equipmentsBinary = reverseString(hex2Bin(identifier.charAt(0) + identifier.charAt(1)));

        for (var i = 0; i < modulesBinary.length; i++)
            if (modulesBinary.charAt(i) == '1')
                modules.push(i + 1);

        for (i = 0; i < equipmentsBinary.length; i++) {

            if (equipmentsBinary.charAt(i) == '1') {

                equipments.push(i + 1);
                equipmentsText.push(equipmentsLabel[i]);

            }

        }

        var ordersBinary = hex2Bin(data);
        var orders = [
            ordersBinary.charAt(6) + ordersBinary.charAt(7),
            ordersBinary.charAt(4) + ordersBinary.charAt(5),
            ordersBinary.charAt(2) + ordersBinary.charAt(3),
            ordersBinary.charAt(0) + ordersBinary.charAt(1)
        ];

        var ordersLabel = [];

        equipments.forEach(function (e) {
            ordersLabel.push({
                    "id": e,
                    "ordersLabel": [
                        getOrderById(e - 1, parseInt(orders[0], 2)),
                        getOrderById(e - 1, parseInt(orders[1], 2)),
                        getOrderById(e - 1, parseInt(orders[2], 2)),
                        getOrderById(e - 1, parseInt(orders[3], 2))
                    ]
                }
            );
        });

        return JSON.stringify({
            "equipments": equipments,
            "equipmentsText": equipmentsText,
            "modules": modules,
            "orders": orders,
            "ordersLabel": ordersLabel
        });

    }else{

        console.log("[SERIAL CONNECTION] La donnée reçue sur le port série est mal formatée".red);

    }

};

var orders = [
    //Ordres aguillages
    [
        "Ne rien changer",
        "Tout droit",
        "Bifurcation",
        "Degrippage"
    ],
    //Ordres signalisations
    [
        "Ne rien changer",
        "Vert",
        "Rouge",
        "Eteindre"
    ],
    //Ordres locomotives
    [
        "Ne rien changer",
        "Eteindre les phares",
        "Allumer les phares",
        "Allumer les phares seulement dans le sens de marche"
    ],
    //Ordre capteur optique / code barre
    [
        "Pas de détection",
        "Debut du code detecte",
        "Fin du code detecte",
        "Code en cours de lecture"
    ]
];

function getOrderById (id, order) {
    if (id > 3 || order > 3) {
        console.log("Ordre ou ID inexistant.".red);
        return "Erreur";
    }
    return orders[id][order];

}

function hex2Bin(hex) {
    var str = parseInt(hex, 16).toString(2);
    while (str.length < 8)
        str = "0" + str;
    return str;
}

function reverseString(string) {
    return string.split("").reverse().join("");
}
