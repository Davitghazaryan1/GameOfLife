var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Grass = require('./class')
var GrassEater = require('./grasseater')
var Predator = require('./predator')
var UltraPredator = require('./ultrapredator')
var Nigga = require('./nigga')
var fs = require("fs")
random = require('./random');



app.use(express.static("../client"));


app.get("/", function (req, res) {
    res.redirect("index.html");
});


server.listen(3000, function () {
    console.log("Example is running on port 3000");
});







let size = 30;
let grass = 10;
let grassEater = 200;
let predator = 100;
let ultraPredator = 90;
let nigga = 10;




matrix = []
grassArr = []
grassEatArr = []
predatorArr = []
ultraPredatorArr = []
niggaArr = []


function start() {
    for (let i in grassArr) {
        if(grassArr[i])
        grassArr[i].mul()
    }
    for (let i in grassEatArr) {
        grassEatArr[i].eat()
        if(grassEatArr[i])
        grassEatArr[i].mul()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
        if(predatorArr[i])
        predatorArr[i].mul()
    }
    for (let i in ultraPredatorArr) {
        ultraPredatorArr[i].eat()
        if(ultraPredatorArr[i])
        ultraPredatorArr[i].mul()
    }
    for (let i in niggaArr) {
        niggaArr[i].eat()
        if(niggaArr[i])
        niggaArr[i].mul()
    }

    io.sockets.emit("matrix", matrix)



    var obj = {
        grass: grassArr.length,
        grassEater: grassEatArr.length,
        predator: predatorArr.length,
        ultraPredator: ultraPredatorArr.length,
        nigga: niggaArr.length
    }

    var myJson = JSON.stringify(obj);
    fs.writeFileSync("statistics.json", myJson)
}


function createObj() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y)
                grassArr.push(grass)
            }
            else if (matrix[y][x] == 2) {
                let grassEat = new GrassEater(x, y)
                grassEatArr.push(grassEat)
            }
            else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y)
                predatorArr.push(predator)
            }
            else if (matrix[y][x] == 4) {
                let ultraPredator = new UltraPredator(x, y)
                ultraPredatorArr.push(ultraPredator)
            }
            else if (matrix[y][x] == 5) {
                let nigga = new Nigga(x, y)
                niggaArr.push(nigga)
            }
        }
    }
}


function matrixGenerator(size, countGrass, countGrassEater, predatorCount, ultraPredatorCount, niggaCount) {
    for (let i = 0; i < size; i++) {
        matrix.push([])
        for (let j = 0; j < size; j++) {
            matrix[i].push(0)
        }

    }
    for (let k = 0; k < countGrass; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
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
    for (let k = 0; k < niggaCount; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
        else {
            k--
        }
    }

    return matrix
}



matrix = matrixGenerator(size, grass, grassEater, predator, ultraPredator, nigga);

createObj();

setInterval(start, 1000);


io.on('connection', function (socket) {
    socket.emit("matrix", matrix);
    socket.on("get", get)
});


function get(){
info = fs.readFileSync("statistics.json").toString()
    io.sockets.emit("stat", info)
}