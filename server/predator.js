module.exports = class Predator extends LivingCreature {

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
        return super.chooseCell(character)
    }
    move() {
        if (this.energy > 0) {
            this.energy--;
            let emptyCells = this.chooseCell(0);
            let oneEmptyCell = random(emptyCells);
            if (oneEmptyCell) {
                matrix[this.y][this.x] = 0;
                let newX = oneEmptyCell[0];
                let newY = oneEmptyCell[1];
                this.x = newX;
                this.y = newY;
                matrix[newY][newX] = 3
            }
        }
        else {
            this.die()
        }
    }
    eat() {
        let grasses = this.chooseCell(1);
        let garssEaters = this.chooseCell(2);
        let all = grasses.concat(garssEaters);


        let one = random(all);
        if (one) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let oneX = one[0];
            let oneY = one[1];
            matrix[oneY][oneX] = 3;
            this.x = oneX;
            this.y = oneY;

            for (let i in grassArr) {
                if (oneX == grassArr[i].x && oneY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (let i in grassEatArr) {
                if (oneX == grassEatArr[i].x && oneY == grassEatArr[i].y) {
                    grassEatArr.splice(i, 1);
                    break;
                }
            }
        }
         else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
    mul() {
        if (this.energy >= 8) {
            let newCell = random(this.chooseCell(0));
            if (newCell) {
                let newPredator = new Predator(newCell[0], newCell[1]);
                predatorArr.push(newPredator);
                matrix[newCell[1]][newCell[0]] = 3
                this.energy = 5
            }
        }
    }





}