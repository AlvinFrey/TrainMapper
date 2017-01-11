
var socket = io('http://localhost:1250');

document.getElementById("circuitSVG").addEventListener("load", function() {

    var svgDoc = this.getSVGDocument();

    socket.on("serial-data", function(data){

        if(data.equipments=="4"){

            var svgID = data.modules[0].toString() + (data.orders.indexOf("11") + 1).toString();

            svgDoc.getElementById(svgID).style.setProperty("fill", "#27ae60");
            svgDoc.getElementById(svgID).style.setProperty("stroke", "#27ae60");

            setTimeout(function(){

                svgDoc.getElementById(svgID).style.setProperty("fill", "#333333");
                svgDoc.getElementById(svgID).style.setProperty("stroke", "#ffffff");

            }, 1000);

        }

    });

});