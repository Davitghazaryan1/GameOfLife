var socket = io()
var side = 300

k = document.getElementById("k");
f = document.getElementById("f");
r = document.getElementById("r");
d = document.getElementById("d");
w = document.getElementById("w");
season = document.getElementById("season");

var back = "#acacac";
var grassColor = "#0c7a23";
var grassEaterColor = "#dbdb23";
var predatorColor = "#fc2b2b";
var ultraPredatorColor = "#3f43b0";
var terroristColor = "#0a0a0a";



var p = document.getElementById("button");
p.addEventListener("click", ckickbutton);

socket.on("matrix", handlematrix)



function setup() {
    createCanvas(side + 1, side + 1);
    background('#acacac');
}


function handlematrix(matrix) {


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill(back);
            }
            else if (matrix[y][x] == 1) {
                fill(grassColor);
            }
            else if (matrix[y][x] == 2) {
                fill(grassEaterColor);
            }
            else if (matrix[y][x] == 3) {
                fill(predatorColor);
            }
            else if (matrix[y][x] == 4) {
                fill(ultraPredatorColor);
            }
            else if (matrix[y][x] == 5) {
                fill(terroristColor);
            }

            rect(x * side / matrix.length, y * side / matrix.length, side / matrix.length, side / matrix.length);


        }
    }
}







//statistics




function ckickbutton() {
    socket.emit("m", "get")
}





socket.on("info", getS)




function getS(info) {
    info = JSON.parse(info)
    k.innerText = "Grass " + info.grass
    f.innerText = "GrassEater " + info.grasseater
    r.innerText = "Predator " + info.predator
    d.innerText = "Terrorist " + info.terrorist
    w.innerText = "Ultrapredator " + info.ultraPredator
}







// iradardzutyun (play/pause)

var play = document.getElementById("play");
play.addEventListener("click", function () {

    socket.emit("play");

});

var pause = document.getElementById("pause");
pause.addEventListener("click", function () {
    socket.emit("pause");

});



//seasons


function winter() {
    grassColor = "white"
    grassEaterColor = "#ffffaa"
    predatorColor = "#ffdd99"

    season.innerText = "It's Winter"

    socket.emit("winter", 5000)
}
function spring() {
    grassColor = "green"
    grassEaterColor = "yellow"
    predatorColor = "orange"

    season.innerText = "It's Spring"

    socket.emit("spring", 1000)
}
function summer() {
    grassColor = "green"
    grassEaterColor = "yellow"
    predatorColor = "orange"

    season.innerText = "It's Summer"

    socket.emit("summer", 1500)
}
function autumn() {
    grassColor = "#888822"
    grassEaterColor = "yellow"
    predatorColor = "orange"

    season.innerText = "It's Autumn"

    socket.emit("autumn", 3000)
}





function virus(){
    socket.emit("virus", "virus")
}