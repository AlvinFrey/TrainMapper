
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

    var lightsActive = 0;

    document.getElementById("lights").addEventListener("click", function() {

        if(lightsActive==0){

            feux.forEach(function(id) {
                svgDoc.getElementById(id).style.setProperty("display", "none");
            });

            lightsActive = 1;

        }else if(lightsActive==1){

            feux.forEach(function(id) {
                svgDoc.getElementById(id).style.setProperty("display", "block");
            });

            lightsActive = 0;

        }

    });

    var switchingActive = 0;

    document.getElementById("switching").addEventListener("click", function() {

        var switching = [
            "11a",
            "12a",
            "13a",
            "21a",
            "22a",
            "23a",
            "32a",
            "34a",
            "43a",
            "44a",
            "hautdouble",
            "basdouble",
            "g4567"
        ];

        if(switchingActive==0){

            switching.forEach(function(id) {
                console.log(id);
                svgDoc.getElementById(id).style.setProperty("display", "none");
            });

            switchingActive = 1;

        }else if(switchingActive==1){

            switching.forEach(function(id) {
                svgDoc.getElementById(id).style.setProperty("display", "block");
            });

            switchingActive = 0;

        }

    });

    var placesActive = 0;

    document.getElementById("places").addEventListener("click", function() {

        var places = [
            "11",
            "12",
            "13",
            "14",
            "21",
            "22",
            "23",
            "24",
            "31",
            "32",
            "33",
            "34",
            "41",
            "43",
            "44",
            "51",
            "52",
            "53",
            "54"
        ];

        if(placesActive==0){

            places.forEach(function(id) {
                svgDoc.getElementById(id).style.setProperty("display", "none");
            });

            placesActive = 1;

        }else if(placesActive==1){

            places.forEach(function(id) {
                svgDoc.getElementById(id).style.setProperty("display", "block");
            });

            placesActive = 0;

        }

    });

});