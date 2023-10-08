class UltraPredator extends LivingCreature{

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
                matrix[newY][newX] = 4
                this.x = newX;
                this.y = newY;
            }
        } else {
            this.die()
        }
    }
    eat() {
        let grasses = this.chooseCell(1);
        let garssEaters = this.chooseCell(2);
        let predators = this.chooseCell(3);
        let all1 = grasses.concat(garssEaters);
        let all = all1.concat(predators);
        let one = random(all)

        if (one) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let oneX = one[0];
            let oneY = one[1];
            matrix[oneY][oneX] = 4;
            this.x = oneX;
            this.y = oneY;

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
        if (this.energy >= 12) {
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