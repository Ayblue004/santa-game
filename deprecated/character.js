const character = document.getElementById("character");
const characterSize = 80
const sleighPosition = [0,0]

var characterPosition = [1,1];
var newCharacterPosition = [0,0];


var pastPositions = []
var direction = "w";
var characterOrientation = 0;
var length = 1;
const speed = 200;

var gameOver = false;

function clearGrid() {
    gridBlocks.forEach(row => {
        row.forEach(block => {
            if (block.className != "food") {
                block.className = "";
            } 
        })
    })
}

function updateCharacterPosition() {   


    var positionOffset = [0,0]; // As grid positionings
    positionOffset[0] = newCharacterPosition[0] - characterPosition[0]
    positionOffset[1] = newCharacterPosition[1] - characterPosition[1]

    if (troubleshootMode) {
        gridBlocks[newCharacterPosition[1]-1][newCharacterPosition[0]-1].style.backgroundColor = Math.floor(Math.random()*16777215).toString(16);
    }

    characterPosition = [newCharacterPosition[0], newCharacterPosition[1]];
    pastPositions.push([characterPosition, characterOrientation])

    try {
        if (gridBlocks[characterPosition[1]-1][characterPosition[0]-1].className == "food") {
            length += 1;
            gridBlocks[characterPosition[1]-1][characterPosition[0]-1].className = "";  
            generateFood();
        } else if (gridBlocks[characterPosition[1]-1][characterPosition[0]-1].className == "body") {
            gameOver = true;
            return;
        }
    } catch {
        gameOver = true;
        return;
    }

    clearGrid();

    pastPositions.reverse()

    for(let i = 0; i < length; i++) {
        if (pastPositions.length < i+1) continue;
        let target = gridBlocks[pastPositions[i][0][1]-1][pastPositions[i][0][0]-1]

        if (troubleshootMode) {
            target.style.backgroundColor = Math.floor(Math.random()*16777215).toString(16);
        } 
        
        if (i == length-1) {
            character.style.left = (pastPositions[i][0][0]-1) * trueSquareWidth;
            character.style.top = (pastPositions[i][0][1]-1) * trueSquareHeight;
            character.style.rotate = `${pastPositions[i][1]}deg`;
        } else {
            target.className = "body";
            target.style.rotate = `${pastPositions[i][1]}deg`;
        }
    }

    pastPositions.reverse();
    
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

window.addEventListener("load", async () => {

    let characterOffset = (characterSize-((trueSquareHeight+trueSquareWidth)/2))/2
    character.style.height = characterSize;
    character.style.width = characterSize;
    character.style.transform = `translate(-${characterOffset}, ${characterOffset})`

    character.style.transitionDuration = `${speed}ms`;

    while (!gameOver) {
        await sleep(speed);
        if (!readyToMove) { continue;}   

        switch (direction) {
            case "n": // up
                newCharacterPosition[1] -= 1;
                characterOrientation = 90;
                break;
            case "e": // right
                newCharacterPosition[0] += 1;
                characterOrientation = 180;
                break;
            case "s": // down
                newCharacterPosition[1] += 1;
                characterOrientation = 270;
                break;
            case "w": // left
                newCharacterPosition[0] -= 1;
                characterOrientation = 0;
                break;
        }

        updateCharacterPosition();
    }

    console.log("Game over!");
});

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var newDirection;

    switch (name) {
        case "w": // up
            newDirection = "n";
            break;
        case "a": // right
            newDirection = "w";
            break;
        case "s": // down
            newDirection = "s";
            break;
        case "d": // left
            newDirection = "e";
            break;
    }

    let ordered = ["n", "e", "s", "w"];
    let newPosition = ordered.indexOf(direction)
    let oppositeDirection = newPosition + 2;

    if (oppositeDirection + 1 > ordered.length) {
        oppositeDirection = oppositeDirection - ordered.length;
    }

    console.log(direction, ordered[oppositeDirection])


    if (length == 1) direction = newDirection;
    else if (ordered[oppositeDirection] != newDirection) direction = newDirection;
    


});