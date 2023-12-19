const scatterDistance = [10,110];
const spawnAmount = [5, 5];
const scatterFrequency = speed;
const despawnTime = 3000;
const coinSize = [5,10];

const images = ["images/sulfur.png", "images/coins.png"]

function randint(min, max) {
    return Math.floor(Math.random() * max) + min;
}

class coin {
    constructor() {
        this.element = document.createElement("img");
        this.element.src = images[randint(1, images.length)-1];
        this.element.style.height = randint(coinSize[0], coinSize[1])
        this.element.style.width = this.element.style.height
        this.element.style.position = "absolute";

        let leftOffset = randint(scatterDistance[0], scatterDistance[1]);
        let topOffset = randint(scatterDistance[0], scatterDistance[1]);

        this.element.style.left = parseFloat(character.style.left.split("px")[0])-1 + leftOffset;
        this.element.style.top = parseFloat(character.style.top.split("px")[0])-1 + topOffset;

        this.element.style.zIndex = 99;

        (async() => this.despawner())();
    }

    async despawner() {
        // await sleep(despawnTime)
        await sleep((length+1)*speed);

        if (!gameOver)  this.element.remove(); 
    }
}

window.addEventListener("load", async () => {
    while (!gameOver) {
        if (!readyToMove) continue;
        // await sleep(scatterFrequency);
        await sleep(speed);
        let element = document.createElement("div");

        for(let i = 0; i < randint(spawnAmount[0], spawnAmount[1]); i++) {
            let c = new coin();
            element.appendChild(c.element)
        };

        grid.appendChild(element);

    }
});