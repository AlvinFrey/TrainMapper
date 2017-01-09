
var socket = io('http://localhost:1251');

socket.on('serial-data', function(data){

    console.log(data);

});
