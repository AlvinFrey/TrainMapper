
var socket = io('http://localhost:1250');

socket.on("serial-data", function(data){

   console.log(data);

});


