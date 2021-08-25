class Renderer {
    constructor(element, scale, width, height) {
        this.width = width;
        this.height = height;

        this.element = element;
        this.element.style.display = "flex";
        this.element.style.width = `${width * scale}px`;
        this.element.style.height = `${height * scale}px`;

        for (let x = 0; x < this.width; x++) {
            const col = document.createElement("div");
            col.style.width = `${scale}px`;
            col.style.height = `${this.height * scale}px`;
            this.element.appendChild(col);
            for (let y = 0; y < this.height; y++) {
                const pixel = document.createElement("div");
                pixel.style.width = `${scale}px`;
                pixel.style.height = `${scale}px`;
                col.appendChild(pixel);
            }
        }
    }
    clear = () => {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.element.children[x].children[y].style.backgroundColor = "rgba(0,0,0,0)";
            }
        }
    }
    drawRectangle = (startX, startY, width, height) => {
        if (startX + width > this.width || startY + height > this.height) {
            throw new Error("Rectangle out of bounds");
        }
        else {
            for (let y = startY; y < startY + height; y++) {
                for (let x = startX; x < startX + width; x++) {
                    this.element.children[x].children[y].style.backgroundColor = "rgba(255,255,255,1)";
                }
            }
        }
    }
}

const element = document.getElementById("renderer");

const renderer = new Renderer(element, 3, 304, 240);

const loop = () => {
    renderer.clear();
    requestAnimationFrame(loop);
};

requestAnimationFrame(loop);