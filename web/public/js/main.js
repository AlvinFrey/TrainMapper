
var socket = io('http://localhost:1250');

document.getElementById("circuitSVG").addEventListener("load", function() {

    var svgDoc = this.getSVGDocument();

    svgDoc.getElementById("14l").style.setProperty("fill", "red");

    socket.on("serial-data", function(data){

        console.log(data);

    });

});