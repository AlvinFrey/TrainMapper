createAction = function ({
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
    var action = "6";
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

    action += Bin2Hex(equipment).length == 1 ? "0" + Bin2Hex(equipment) : Bin2Hex(equipment);
    action += Bin2Hex(modules).length == 1 ? "0" + Bin2Hex(modules) : Bin2Hex(modules);
    return action;
};

//testing
console.log(createAction({
    aiguillage: true,
    feux: true,
    module1: true,
    module2: true,
    module3: true,
    module4: true,
    module5: true,
    module6: true,
    module7: true,
    module8: true
}));

createRequest = function () {

};

function checkBin(n) {
    return /^[01]{1,64}$/.test(n)
}

/**
 * @return {string}
 */
function Bin2Hex(n) {
    if (!checkBin(n))return 0;
    return parseInt(n, 2).toString(16).toUpperCase();
}