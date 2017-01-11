document.getElementById("circuitSVG").addEventListener("load", function () {
    var svgDoc = this.getSVGDocument();

    svgDoc.getElementById("13l").style.setProperty("fill", "green");
    
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

    for (var i = 0; i < feux.length; i++) {
        var t = feux[i];
        svgDoc.getElementById(t).addEventListener('click', function (event) {
            console.log("Clicked on ! " + event.target.id);
        });
    }

});