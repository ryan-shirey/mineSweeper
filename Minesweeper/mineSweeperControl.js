class mineSweeper {
    mines;
    valueArr;
    width;
    height;
    size;
    constructor(height, width, numMines) {
        this.height = height;
        this.width = width;
        this.mines = new Set();
        this.size = height*width
        this.valueArr = new Array(height * width).fill(0);
        for (let i = 0; i < numMines; i++) {
            var mineLoc = (Math.floor(Math.random() * height * width));
            this.mines.has(mineLoc) ? i-- : this.mines.add(mineLoc);
        }
        let iterator = this.mines.values();
        let result = iterator.next();
        while (!result.done) {
            this.valueIncrement(result.value);
            result = iterator.next();
        }
        iterator = this.mines.values();
        result = iterator.next();
        while (!result.done) {
            this.valueArr[result.value] = -1;
            result = iterator.next();
        }

    }
    mineCheck(clickLoc) {
        return (this.valueArr[clickLoc]);
    }
    valueIncrement(item) {
        let edge = item % this.width;
        let leftMost = (edge == 0 ? 0 : -1);
        let rightMost = (edge == this.width - 1 ? 1 : 2);
        for (let i = leftMost; i < rightMost; i++) {
            for (let j = -1; j < 2; j++) {
                var arrIndex = item + i + (j * this.width);
                if (arrIndex >= 0 && arrIndex < (this.size)) {
                    this.valueArr[arrIndex] = this.valueArr[arrIndex] + 1;
                }
            }
        }
    }
}