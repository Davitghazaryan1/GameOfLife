var socket = io()
var side = 300

k = document.getElementById("k");
f = document.getElementById("f");
r = document.getElementById("r");
d = document.getElementById("d");
w = document.getElementById("w");

let winterArgument = false;
let winter = document.getElementById('winter');
let springArgument = false;
var spring = document.getElementById("spring");
let fallArgument = false;
let fall = document.getElementById('fall');
let summerArgument = true;
let summer = document.getElementById('summer');

var p = document.getElementById("button");
p.addEventListener("click", clickbuttun);

socket.on("matrix", handlematrix)



function setup() {
    createCanvas(side + 1, side + 1);
    background('#acacac');
}


function handlematrix(matrix) {

    
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

            rect(x * side / matrix.length, y * side / matrix.length, side / matrix.length, side / matrix.length);
             
       
        }
    }
}







//statistics


function clickbuttun() {
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




//season


 spring.addEventListener("click", function() {
    springArgument = true;
    summerArgument = false;
    fallArgument = false;
    winterArgument = false;
});



summer.addEventListener('click', function () {
    springArgument = false;
    summerArgument = true;
    fallArgument = false;
    winterArgument = false;
})


fall.addEventListener('click', function () {
    springArgument = false;
    summerArgument = false;
    fallArgument = true;
    winterArgument = false;
});


winter.addEventListener('click', function () {
    springArgument = false;
    summerArgument = false;
    fallArgument = false;
    winterArgument = true;
});




//not used yet

function draww(matrix) {
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 0) {
                fill(115, 67, 3);
            }
            // grass
            else if (matrix[i][j] == 1) {
                if (springArgument == true) {
                    fill(57, 189, 0)
                } else if (summerArgument == true) {
                    fill(29, 105, 13);
                } else if (autumnArgument == true) {
                    fill(145, 155, 51);
                } else if (winterArgument == true) {
                    fill(255, 255, 255);
                }
            }
            //

            else if (matrix[i][j] == 2) {
                fill(120, 18, 23);
            }
            else if (matrix[i][j] == 3) {
                fill(250, 163, 12);
            }
            else if (matrix[i][j] == 4) {
                fill(13, 61, 94);
            }
            else if (matrix[i][j] == 5) {
                fill(148, 12, 114);
            }}
            rect(i * side / matrix.length, j * side / matrix.length, side / matrix.length, side / matrix.length);
        }}






// iradardzutyun (play/pause)

var play = document.getElementById("play");
play.addEventListener("click", function (){

    socket.emit("play");
    
});

var pause = document.getElementById("pause");
pause.addEventListener("click", function (){
    socket.emit("pause");
    
});






