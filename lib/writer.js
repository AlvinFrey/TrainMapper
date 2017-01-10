var createRequest = function ({
    aiguillage = false,
    feux = false,
    locomotive = false,
    optique = false,
    boucle = false,
    pont = false,
    module1 = false,
    module2 = false,
    module3 = false,
    module4 = false,
    module5 = false,
    module6 = false,
    module7 = false,
    module8 = false
}) {
    var request = "6";
    var equipment = "";
    equipment += pont ? "1" : "0";
    equipment += boucle ? "1" : "0";
    equipment += optique ? "1" : "0";
    equipment += locomotive ? "1" : "0";
    equipment += feux ? "1" : "0";
    equipment += aiguillage ? "1" : "0";

    var modules = "";
    modules += module8 ? "1" : "0";
    modules += module7 ? "1" : "0";
    modules += module6 ? "1" : "0";
    modules += module5 ? "1" : "0";
    modules += module4 ? "1" : "0";
    modules += module3 ? "1" : "0";
    modules += module2 ? "1" : "0";
    modules += module1 ? "1" : "0";

    request += Bin2Hex(equipment).length == 1 ? "0" + Bin2Hex(equipment) : Bin2Hex(equipment);
    request += Bin2Hex(modules).length == 1 ? "0" + Bin2Hex(modules) : Bin2Hex(modules);
    return request;
};

var createAction = function ({
    aiguillage = false,
    feux = false,
    locomotive = false,
    optique = false,
    boucle = false,
    pont = false,
    module1 = false,
    module2 = false,
    module3 = false,
    module4 = false,
    module5 = false,
    module6 = false,
    module7 = false,
    module8 = false,
    order1 = 0,
    order2 = 0,
    order3 = 0,
    order4 = 0
}) {
    var action = createRequest({
            aiguillage: aiguillage,
            feux: feux,
            locomotive: locomotive,
            optique: optique,
            boucle: boucle,
            pont: pont,
            module1: module1,
            module2: module2,
            module3: module3,
            module4: module4,
            module5: module5,
            module6: module6,
            module7: module7,
            module8: module8
        }) + " ";

    var data = "";
    data += Dec2Bin(order4);
    data += Dec2Bin(order3);
    data += Dec2Bin(order2);
    data += Dec2Bin(order1);

    return action + Bin2Hex(data);
};

module.exports = {
    createAction: createAction,
    createRequest: createRequest
};

/**
 * @return {string}
 */
function Bin2Hex(n) {
    var result = parseInt(n, 2).toString(16).toUpperCase();
    while (result.length < 2)
        result = "0" + result;
    return result;
}

/**
 * @return {string}
 */
function Dec2Bin(n) {
    var result = n.toString(2);
    while (result.length < 2)
        result = "0" + result;
    return result;
}