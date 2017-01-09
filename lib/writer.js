/*
var equipments = {

    "switching": "00000001",
    "light": "00000010"

};

var lightValues = {

    "none": "00",
    "green": "01",
    "red": "10",
    "stop": "11"

};

var switchingValues = {

    "none": "00",
    "forward": "01",
    "fork": "10",
    "ungrip": "11"

};

 var equipmentsLabel = [
 'Aiguillages et Croisements',
 'Feux de Signalisation',
 'Locomotives',
 'Capteurs Optiques (Position)',
 'Boucles de Retournement',
 'Ponts Tournant'
 ];

*/



createAction = function({aiguillage = false, feux = false}={}) {
    console.log("Aiguillage : " + aiguillage);
    console.log("Feux : " + feux);
};

createAction({feux: true});

createRequest = function() {

}