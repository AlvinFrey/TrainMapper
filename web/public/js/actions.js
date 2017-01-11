var feux = [
    "11l",
    "12l",
    "13l",
    "14l",
    "21l",
    "22l",
    "24l",
    "31l",
    "32l",
    "33l",
    "34l",
    "41l",
    "42l",
    "43l",
    "44l",
    "52l",
    "53l",
    "54l"
];

var selectedLed = null;

document.getElementById("circuitSVG").addEventListener("load", function () {
    var svgDoc = this.getSVGDocument();

    feux.forEach(function(id) {
        var elem = svgDoc.getElementById(id);
        elem.style.setProperty("fill", "#3f3e3d");
        elem.addEventListener('click', function (event) {
            clickOnLed(event.target, svgDoc);
        });
    });

    document.getElementById("ledVertButton").addEventListener("click", function() {
       clickLedButton("green", svgDoc);
    });

    document.getElementById("ledRougeButton").addEventListener("click", function() {
        clickLedButton("red", svgDoc);
    });

    document.getElementById("ledEteindreButton").addEventListener("click", function() {
        clickLedButton("off", svgDoc);
    });

    document.getElementById("ledEteindreLeds").addEventListener("click", function() {
        if (selectedLed != null)
            clickOnLed(selectedLed, svgDoc);
        feux.forEach(function(id) {
            setLedState(svgDoc.getElementById(id), "off");
        });
    });
});

function clickLedButton(state, svgDoc) {
    if (selectedLed != null) {
        setLedState(selectedLed, state.toLowerCase());
        clickOnLed(selectedLed, svgDoc);
    }
}

function setLedState(led, state) {
    if (state.includes("green")) {
        led.style.setProperty("fill", "#27ae60");
        //Envoyer ordre sur serial ici
    } else if (state.includes("red")) {
        led.style.setProperty("fill", "#e74c3c");
        //Envoyer ordre sur serial ici
    } else if (state.includes("off")) {
        led.style.setProperty("fill", "#3f3e3d");
        //Envoyer ordre sur serial ici
    }
}

function clickOnLed(led, svgDoc) {
    resetLedsStrokeColor(svgDoc);
    if (selectedLed == led) {
        selectedLed = null;
        //Cacher les boutons d'actions pour les feux
        document.getElementById("actionsFeux").style.setProperty("display", "none");
    } else {
        selectedLed = led;
        led.style.setProperty("stroke", "yellow");
        //Afficher les boutons d'actions pour les feux
        document.getElementById("actionsFeux").style.setProperty("display", "block");
    }
}

function resetLedsStrokeColor(svgDoc) {
    if (selectedLed != null)
        selectedLed.style.setProperty("stroke", "white");
    feux.forEach(function(id) {
        svgDoc.getElementById(id).style.setProperty("stroke", "white");
    });
}