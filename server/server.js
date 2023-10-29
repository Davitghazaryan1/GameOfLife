var express = require("express");
var app = express();
app.use(express.static("../client"));
var fs = require("fs")
let random = require("./random");





var server = require('http').createServer(app);
var io = require('socket.io')(server);



app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, function () {
    console.log("Example is running on port 3000");
});





size = 30;
grass = 10;
grassEater = 200;
predator = 100;
ultraPredator = 90;
terrorist = 10;

var count = 0;
var id;
var frameRate = 500;

matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
ultraPredatorArr = [];
terroristArr = [];




var Grass = require("./grass.js");
var GrassEater = require("./grassEater.js");
var Predator = require("./predator.js");
var Ultrapredator = require("./ultrapredator.js");
var Terrorist = require("./terrorist.js");

 



function matrixGenerator(size, countGrass, countGrassEater, predatorCount, ultraPredatorCount, terroristCount) {
    for (let i = 0; i < size; i++) {
        matrix.push([]);
        for (let j = 0; j < size; j++) {
            matrix[i].push(0);
        }
    }
    for (let k = 0; k < countGrass; k++) {
        let x = Math.floor(random(size));
        let y = Math.floor(random(size));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        }
        else {
            k--
        }
    }
    for (let k = 0; k < countGrassEater; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
        else {
            k--
        }
    }
    for (let k = 0; k < predatorCount; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
        else {
            k--
        }
    }
    for (let k = 0; k < ultraPredatorCount; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
        else {
            k--
        }
    }
    for (let k = 0; k < terroristCount; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
        else {
            k--
        }
    }

    return matrix;
}






matrix = matrixGenerator(size, grass, grassEater, predator, ultraPredator, terrorist);






createObj();


function createObj() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y, 1)
                grassArr.push(grass)
            }
            else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y, 2)
                grassEaterArr.push(grassEater)
            }
            else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y, 3)
                predatorArr.push(predator)

            }
            else if (matrix[y][x] == 4) {
                let ultraPredator = new Ultrapredator(x, y, 4)
                ultraPredatorArr.push(ultraPredator)

            }
            else if (matrix[y][x] == 5) {
                let terrorist = new Terrorist(x, y, 5)
                terroristArr.push(terrorist)
            }

        }

    }


}


function run() {


    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in ultraPredatorArr) {
        ultraPredatorArr[i].eat();
    }
    for (var i in terroristArr) {
        terroristArr[i].eat();
    }



    io.sockets.emit("matrix", matrix);
    var obj = {
        grass: grassArr.length,
        grasseater: grassEaterArr.length,
        predator: predatorArr.length,
        terrorist: terroristArr.length,
        ultraPredator: ultraPredatorArr.length
    }


    var myJSON = JSON.stringify(obj);
    fs.writeFileSync("statistics.json", myJSON);


}





io.on('connection', function (socket) {
    socket.emit("matrix", matrix);
    socket.on("m", b)
    socket.on("pause", pause)
    socket.on("play", play)


    socket.on("winter", changeRate)
    socket.on("spring", changeRate)
    socket.on("summer", changeRate)
    socket.on("autumn", changeRate)
    
    socket.on("virus", virus)

});



function b() {
    let info = fs.readFileSync("statistics.json").toString()
    io.sockets.emit("info", info)

}






function pause() {
    clearInterval(id);
    count = 0;
}





function play() {
    if (count == 0) {
        id = setInterval(run, frameRate);
        count++;
    }
}







function changeRate(rate){
    frameRate = rate
    clearInterval(id)
    id = setInterval(run, frameRate)
}




function virus(){
    for (var i in grassArr) {
        grassArr.splice(0, i);
    }
    for(var i in matrix){
        for(var j in matrix[i]){
            if(matrix[i][j] == 1){
                matrix[i][j] = 0;
            }
        }
    }
}