var socket = io();

socket.on("name", handelInfo);

function handelInfo(esim){
    console.log(esim);
}