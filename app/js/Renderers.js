const BaseRenderer = class BaseRenderer {
    constructor(canvas) {
        this.canvas = canvas.canvasObject;
        this.ctx = canvas.ctx;
    }

    // fill with solid color
    fill(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // draw xy coordinates
    drawCoordinates() {
        this.ctx.fillStyle = '#ffffff';
        for (let x = 0; x < this.canvas.width; x += 100) {
            for (let y = 0; y < this.canvas.height; y += 100) {
                this.ctx.fillText(`(${x}, ${y})`, x, y);
            }
        }
        // console.log('canvas coordinates drawn');
    }

    // draw string
    drawString(string, x, y, color = '#ffffff', font = '20px Monospace') {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        // correct for font height
        y += parseInt(font);
        this.ctx.fillText(string, x, y);
    }

    // update should be overwriten by child classes
    update() {
        console.log('BaseRenderer.update() called. This should be overwritten by child classes.');
    }
}

const HexRenderer = class HexRenderer extends BaseRenderer {
    constructor(canvas) {
        super(canvas);
    }
}