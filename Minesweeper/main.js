gameBoard = new mineSweeper(10, 10, 10);
clickedSet = new Set();
suspectMines = new Set();
function startGame(height, width, numMines) {

    this.gameBoard = new mineSweeper(height,width, numMines);
    this.clickedSet = new Set();
    const mineField = document.querySelector("#mineField");
    mineField.textContent = '';
    document.querySelector("#statusText").textContent = '';
    let rowString = '25px';
    for (let i = 1; i < width; i++) {
        rowString = rowString + ' 25px';
    }
    mineField.style.gridTemplateColumns = rowString;
    mineField.style.gridTemplateRows = rowString;
    const size = height*width;
    for (i = 0; i < size; i++) {
        const mine = document.createElement("div");
        mine.setAttribute("class", "mine");
        mine.setAttribute("id", String(i));
        mineField.appendChild(mine);
    }
    
}
function onClickDelegator(event) {
    console.log(event);
    let target = event.target.closest('div');

    if (target.classList.contains("mine")) {
        let mineID = parseInt(target.id);
        if (event.shiftKey) {
            if (!suspectMines.has(mineID) && !clickedSet.has(mineID)) {
                suspectMines.add(mineID);
                target.style.backgroundColor = "purple";
            }
            else if (suspectMines.has(mineID) && !clickedSet.has(mineID)) {
                suspectMines.delete(mineID);
                target.style.backgroundColor = "aqua";
            }
        }
        else {
            triggerMine(target);
        }
    }
}
function endgame() {
    let textBox = document.querySelector("#statusText")
    textBox.textContent = "Kaboom, You Lose!";
    reveal();
}
function reveal() {
    const mineField = document.querySelector("#mineField");
    for (i = 0; i < gameBoard.size; i++) {
        mine = mineField.children[i];
        mineVal = gameBoard.mineCheck(parseInt(mine.id));
        if (mineVal == -1) {
            mine.style.backgroundColor = "red";
        }
        else {
            mine.style.backgroundColor = "green";

            mine.textContent = mineVal;
        }
    }
}
function triggerMine(mine) {
    clickedSet.add(parseInt(mine.id));
    var mineVal = gameBoard.mineCheck(parseInt(mine.id));
    if (mineVal == -1) {
        endgame();
    }
    else {
        mine.style.backgroundColor = "green";

        mine.textContent=mineVal;
    }
    if (mineVal == 0) {
        let edge = parseInt(mine.id) % gameBoard.width;
        let leftMost = (edge == 0 ? 0 : -1);
        let rightMost = (edge == gameBoard.width - 1 ? 1 : 2);
        for (let i = leftMost; i < rightMost; i++) {
            for (let j = -1; j < 2; j++) {
                neighborID = parseInt(mine.id) + i + gameBoard.width * j;
                if (neighborID >= 0 && neighborID < gameBoard.size) {
                    neighborMine = document.getElementById(String(neighborID));
                    if (!clickedSet.has(parseInt(neighborMine.id))) {
                        triggerMine(neighborMine);
                    }
                }
            }
        }
        
    }
    
}
