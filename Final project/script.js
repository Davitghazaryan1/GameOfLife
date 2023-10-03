let side = 30;
let n = 30;
let m = 200;
let p = 100;
let q = 70;
let r = 50;
let g = 5;
let fr = 10



let matrix = []
let grassArr = []
let grassEatArr = []
let predatorArr = []
let ultraPredatorArr = []
let niggaArr = []

function frozen(n, side) {
    fill(39, 229, 232, 100);
    rect((n - side) / 2, (n - side) / 2, n * side, n * side);
    frameRate(1);
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
}



function setup() {

    matrixGenerator(n, m, p, q, r, g);
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background('#acacac');

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

function draw() {
    frameRate(fr)

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
            
            rect(x * side, y * side, side, side);
        }
    }

    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEatArr) {
        grassEatArr[i].eat()
    }
    for (let i in grassEatArr) {
        grassEatArr[i].mul()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].mul()
    }
    for (let i in ultraPredatorArr) {
        ultraPredatorArr[i].eat()
    }
    for (let i in ultraPredatorArr) {
        ultraPredatorArr[i].mul()
    }
    for (let i in niggaArr) {
        niggaArr[i].eat()
    }
    for (let i in niggaArr) {
        niggaArr[i].mul()
    }




    if (keyIsDown(UP_ARROW)) {
        frozen(n, side)
    }
}