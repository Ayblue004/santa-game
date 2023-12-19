const totalFood = 5;

function randomTile() {
    return gridBlocks[randint(1, gridBlocks.length)-1][randint(1, gridBlocks[0].length)-1];
}

function generateFood() {
    let tile;
    while (true) {
        tile = randomTile();

        if (tile.className.length == 0) break
    }

    tile.className = "food";

}

window.addEventListener("load", async () => {


    while (true) {
        await sleep(10)
        if (readyToMove) {
            for(let i = 0; i < totalFood; i++) generateFood(); 
            return;
        }
    }
})