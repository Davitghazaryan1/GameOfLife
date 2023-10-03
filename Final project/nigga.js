class Nigga {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 1;
        this.directions = [];

    }
    getNewCoordinates() {

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        let a = this.chooseCell(1)
        let b = this.chooseCell(2)
        let c = this.chooseCell(3)
        let d = this.chooseCell(4)
        if (this.energy > 0) {
            this.energy--;
            let emptyCells = this.chooseCell(0);
            let oneEmptyCell = random(emptyCells);
            if (oneEmptyCell) {
                matrix[this.y][this.x] = 0;
                let newX = oneEmptyCell[0];
                let newY = oneEmptyCell[1];
                matrix[newY][newX] = 5
                this.x = newX;
                this.y = newY;
            }
        } else if (a || a && d || b && c || c && d || b && d) {
            matrix[this.y][this.x] = 0;
        } else {
            this.die()
        }
    }
    eat() {
        let garssEaters = this.chooseCell(2);
        let predators = this.chooseCell(3);
        let ultraPredator = this.chooseCell(4);
        let all1 = garssEaters.concat(predators);
        let all = all1.concat(ultraPredator);
        let one = random(all)

        if (one) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let oneX = one[0];
            let oneY = one[1];
            matrix[oneY][oneX] = 5;
            this.x = oneX;
            this.y = oneY;

            for (let i in ultraPredatorArr) {
                if (oneX == ultraPredatorArr[i].x && oneY == ultraPredatorArr[i].y) {
                    ultraPredatorArr.splice(i, 1);
                    break;
                }
            }
            for (let i in predatorArr) {
                if (oneX == predatorArr[i].x && oneY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            for (let i in grassEatArr) {
                if (oneX == grassEatArr[i].x && oneY == grassEatArr[i].y) {
                    grassEatArr.splice(i, 1);
                    break;
                }
            }
            for (let i in grassArr) {
                if (oneX == grassArr[i].x && oneY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in ultraPredatorArr) {
            if (this.x == ultraPredatorArr[i].x && this.y == ultraPredatorArr[i].y) {
                ultraPredatorArr.splice(i, 1);
                break;
            }
        }
    }
    mul() {
        if (this.energy >= 30) {
            let newCell = random(this.chooseCell(0));
            if (newCell) {
                let ultraPredator = new UltraPredator(newCell[0], newCell[1]);
                ultraPredatorArr.push(ultraPredator);
                matrix[newCell[1]][newCell[0]] = 4;
                this.energy = 5;
            }
        }
    }





}