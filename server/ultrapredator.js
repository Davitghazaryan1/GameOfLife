let LivingCreature = require ("./livingcreature.js")
let random = require("./random");
module.exports = class Ultrapredator extends LivingCreature {

    constructor(x, y, index) {

        super(x,y, index)
        this.energy = 15;

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

    chooseCell(ch){
        this.getNewCoordinates();
        return super.chooseCell(ch);
    }


    mul() {
        if(this.energy >= 15){
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                var newUltraPredator = new Ultrapredator(newCell[0], newCell[1], this.index);
                ultraPredatorArr.push(newUltraPredator);
                matrix[newCell[1]][newCell[0]] = 4;
                this.energy++
            }
        }
    }
    move() {

        this.energy--;

        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {

            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
        }
        if (this.energy <= 0) {
            this.die()
        }
    }

    eat() {

        let foods = this.chooseCell(3)
        let food = random(foods)
        if (food) {
            this.energy++
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[food[1]][food[0]] = 4
            this.x = newX
            this.y = newY
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 5) {
                this.mul()
            }
        }
        else {
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
}

