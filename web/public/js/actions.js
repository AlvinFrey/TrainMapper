document.getElementById("circuitSVG").addEventListener("load", function () {
    var svgDoc = this.getSVGDocument();
    
    var feux = [
        "13l",
        "11l",
        "12l",
        "14l",
       "21l",
        "22l",
        "24l",
        "34l",
        "33l",
        "32l",
        "31l",
        "43l",
        "53l",
        "52l",
        "54l",
        "41l",
        "42l",
        "ellipse4490"
    ];

    feux.forEach(function(id) {
        var elem = svgDoc.getElementById(id);
        elem.style.setProperty("fill", "#3f3e3d");
        elem.addEventListener('click', function (event) {
            clickOnLed(event.target);
        });
    });
});

function clickOnLed(led) {
    led.setProperty("color", "yellow");
    var div = document.getElementById("actionsFeux");
    div.style.setProperty("stroke", "block");
}