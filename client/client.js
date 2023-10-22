var socket = io();
var side = 400;




socket.on("name", handelInfo);

function handelInfo(esim){
    console.log(esim);
}





socket.on("matrix", handleMatrix);





function setup() {
    createCanvas(side, side);
    background('#acacac');
}



function handleMatrix (matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("#0c7a23");
            }
            else if (matrix[y][x] == 2) {
                fill("#dbdb23");
            }
            else if (matrix[y][x] == 3) {
                fill("#fc2b2b");
            }
            else if (matrix[y][x] == 4) {
                fill("#3f43b0");
            }
            else if (matrix[y][x] == 5) {
                fill("#0a0a0a");
            }
            
            rect(x * side/matrix.length + 1, y * side/matrix.length + 1, side/matrix.length + 1, side/matrix.length + 1);
        }
    }
}