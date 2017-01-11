
var socket = io('http://localhost:1250');

document.getElementById("circuitSVG").addEventListener("load", function() {

    var svgDoc = this.getSVGDocument();

    socket.on("serial-data", function(data){

        data = JSON.parse(data);

        if(data.equipments.indexOf(4) >= 0){

            if((data.orders.indexOf("11") + 1)!=0){

                var svgID = data.modules[0].toString() + (data.orders.indexOf("11") + 1).toString();

                svgDoc.getElementById(svgID).style.setProperty("fill", "#27ae60");
                svgDoc.getElementById(svgID).style.setProperty("stroke", "#27ae60");

                setTimeout(function(){

                    svgDoc.getElementById(svgID).style.setProperty("fill", "#333333");
                    svgDoc.getElementById(svgID).style.setProperty("stroke", "#ffffff");

                }, 1000);

            }

        }

    });

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

    function clickLedButton(state, svgDoc) {
        if (selectedLed != null) {
            setLedState(selectedLed, state.toLowerCase());
            clickOnLed(selectedLed, svgDoc);
        }
    }

    function setLedState(led, state) {

        socket.emit("light-switch", {id: led.id, state: state});

        if (state.includes("green")) {

            led.style.setProperty("fill", "#27ae60");

        } else if (state.includes("red")) {

            led.style.setProperty("fill", "#e74c3c");

        } else if (state.includes("off")) {

            led.style.setProperty("fill", "#3f3e3d");

        }
    }

    function clickOnLed(led, svgDoc) {
        resetLedsStrokeColor(svgDoc);
        if (selectedLed == led) {
            selectedLed = null;
            document.getElementById("actionsFeux").style.setProperty("display", "none");
        } else {
            selectedLed = led;
            led.style.setProperty("stroke", "yellow");
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

});