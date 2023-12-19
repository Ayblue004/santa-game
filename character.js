const character = document.getElementById("character");
const characterSize = 80

var characterPosition = [1,1];
var newCharacterPosition = [1,1];


var pastPositions = []
var direction = "w";
var newDiretion = direction;
var characterOrientation = 0;
var length = 1;
const speed = 75;

const scoreCounter = document.getElementById("score");

const rewards = {
    50: "5% off",
    100: "10% off",
    300: "20% off",
    1000: "50% off" 
}

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

function generateBody(increaseLength=true) {
    if (increaseLength) length += 1;

    element = document.createElement("div");
    element.className = "body";
    element.style.height = trueSquareHeight * 2;
    element.style.width = trueSquareWidth * 2;
    element.style.transitionDuration = `${speed}ms`;
    element.style.transform = `translateY(${trueSquareHeight}px)`;

    grid.appendChild(element);

    bodies.push(element);
}

function checkIfReward() {
    let i = 0;
    Object.keys(rewards).forEach((amount) => {
        i++;
        if (amount == length-1) {
            if (i == Object.keys(rewards).length) {
                alert(`Congratulations! You won ${rewards[Object.keys(rewards)[i-1]]}!`)
            } else {
                if (confirm(`Would you like to redeem a ${rewards[amount]} reward or risk it and try and win a ${rewards[Object.keys(rewards)[i]]} reward.`)) {
                    gameOver = true
                }
            }
        }
    });
}

function checkIfFoodInRange(startingX, startingY) {
    startingX -=1
    startingY -=1

    for(let y = 0; y < 3; y ++) {
        for(let x = 0; x < 3; x++) {
            try {
                if(gridBlocks[startingY+y][startingX+x].className == "food") {

                    gridBlocks[startingY+y][startingX+x].className = "";
    
                    generateFood();
                    generateBody();
    
                    scoreCounter.innerText = length - 1;
                    checkIfReward();
                } 
            } catch {
                continue;
            }
        }
    }

    // for(let y = 0; i < 3; i ++) {
    //     for(let x = 0; x < 3; x++) {
    //         console.log(startingY+y, startingX+x)
    //         // if(gridBlocks[startingY+y][startingX+x].className == "food") {

    //         //     gridBlocks[startingY+y][startingX+x].className = "";

    //         //     generateFood();
    //         //     generateBody();

    //         //     scoreCounter.innerText = length - 1;
    //         // }
    //     }
    // }

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

    checkIfFoodInRange(characterPosition[0]-1, characterPosition[1]-1)

    // console.log(characterPosition[0]-1, characterPosition[1]-1);

    try {

        if (gridBlocks[characterPosition[1]-1][characterPosition[0]-1].className == "body-marker") {
            gameOver = true;
            return;
        }
    } catch {
        gameOver = true;
        return;
    }

    direction = newDiretion;

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
            bodies[i].style.left = (pastPositions[i][0][0]-1) * trueSquareWidth;
            bodies[i].style.top = (pastPositions[i][0][1]-1) * trueSquareHeight;
            bodies[i].style.rotate = `${pastPositions[i][1]}deg`;  

            target.className = "body-marker";
        }
    }

    pastPositions.reverse();
    
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

window.addEventListener("load", async () => {

    scoreCounter.innerText = length - 1;
    
    document.getElementById("maxScore").innerText = gridBlocks.length * gridBlocks[0].length;


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

    alert("Game over! You lost.")
});

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var tmpDirection;
    
    switch (name) {
        case "w": // up
            tmpDirection = "n";
            break;
        case "a": // right
            tmpDirection = "w";
            break;
        case "s": // down
            tmpDirection = "s";
            break;
        case "d": // left
            tmpDirection = "e";
            break;
    }

    let ordered = ["n", "e", "s", "w"];
    let newPosition = ordered.indexOf(direction)
    let oppositeDirection = newPosition + 2;

    if (oppositeDirection + 1 > ordered.length) {
        oppositeDirection = oppositeDirection - ordered.length;
    }

    if (length == 1) newDiretion = tmpDirection;
    else if (ordered[oppositeDirection] != tmpDirection) newDiretion = tmpDirection;
    else newDiretion = direction;
    

});