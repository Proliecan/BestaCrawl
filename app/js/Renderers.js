const BaseRenderer = class BaseRenderer {
    constructor(canvas) {
        this.canvas = canvas.canvasObject;
        this.ctx = canvas.ctx;

        // register renderer
        Cycle.getInstance().registerRenderCallback(this.update.bind(this));
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
    }

    // draw string
    drawString(string, x, y, color = '#ffffff', font = '20px Monospace') {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        // correct for font height
        y += parseInt(font);
        this.ctx.fillText(string, x, y);
    }

    //draw frame rate
    drawFps(fps) {
        this.drawString(fps, 10, 10);
    }

    // update should be overwriten by child classes
    update() {
        // black background
        this.fill('#000000');
        //draw frame rate
        this.drawFps(Cycle.getInstance().fps);

        // draw warning
        this.drawString('BaseRenderer.update() called. This should be overwritten by child classes.', 10, 30, '#ff0000', '20px Monospace');
        // draw stack trace with line breaks
        let stack = new Error().stack;
        let lines = stack.split('\n');
        lines.forEach((line, index) => {
            this.drawString(line, 10, 50 + (20 * (index+1)), '#ff0000', '20px Monospace');
        });
    }
}

const AdvancedRenderer = class AdvancedRenderer extends BaseRenderer {
    constructor(canvas) {
        super(canvas);
    }
}