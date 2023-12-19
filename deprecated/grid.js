const grid = document.getElementById("grid");
const gridSize = grid.getBoundingClientRect();
const squareSize = 50;

var readyToMove = false;
var gridBlocks = [];

var bodies = [];

var trueSquareHeight;
var trueSquareWidth;

const troubleshootMode = false;

window.addEventListener("load", async() => {
    
    var totalHorizontalSquares = Math.floor(gridSize.width / squareSize); // How many squares can fit for squareSize horizontally.
    var totalVerticalSquares = Math.floor(gridSize.height / squareSize);

    trueSquareWidth = squareSize + ((gridSize.width % squareSize) / totalHorizontalSquares) // Add bit to make up difference
    trueSquareHeight = squareSize + ((gridSize.height % squareSize) / totalVerticalSquares)

    for (let y = 0; y < gridSize.height / trueSquareHeight; y++) {
        var row = document.createElement("div");
        var rowObject = [];
        row.className = "row";
        
        for (let x = 0; x < gridSize.width / trueSquareWidth; x++) {
            var block = document.createElement("div");
            block.style.height = trueSquareHeight;
            block.style.width = trueSquareWidth;

            rowObject.push(block);
            
            if (troubleshootMode) {
                block.style.backgroundColor = Math.floor(Math.random()*16777215).toString(16);
                block.innerText = `${y}, ${x}`;
            }
            row.appendChild(block);
        }

        gridBlocks.push(rowObject)
        grid.appendChild(row);
    }

    newCharacterPosition = [Math.floor(totalHorizontalSquares/2) + 1,Math.floor(totalVerticalSquares/2) + 1 ]
    updateCharacterPosition();

    readyToMove = true;
})
