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

    drawCircle(x, y, r, color = '#ffffff') {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    // draw point
    drawPoint(x, y, r, color = '#ffffff', label = '', labelColor = '#ffffff', labelFont = '5px Monospace') {
        this.drawCircle(x, y, r, color);
        let fontHeight = parseInt(labelFont);
        this.drawString(label, x + r, y + r, labelColor, labelFont);
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
            this.drawString(line, 10, 50 + (20 * (index + 1)), '#ff0000', '20px Monospace');
        });
    }
}

const HexRenderer = class HexRenderer extends BaseRenderer {
    constructor(canvas) {
        super(canvas);
    }

    drawHexOptimized(x, y, R, halfR, r, color = '#ffffff', lineWidth = 1) {
        // set settings
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;

        // draw hex from  middle point
        this.ctx.beginPath();
        this.ctx.moveTo(x, y-R);
        this.ctx.lineTo(x+r, y-halfR);
        this.ctx.lineTo(x+r, y+halfR);
        this.ctx.lineTo(x, y+R);
        this.ctx.lineTo(x-r, y+halfR);
        this.ctx.lineTo(x-r, y-halfR);
        this.ctx.lineTo(x, y-R);
        this.ctx.stroke();
    }

    drawHex(x, y, R, r, color = '#ffffff', lineWidth = 1) {
        this.drawHexOptimized(x, y, R, R/2, r, color, lineWidth);
    }


    // draw hex grid
    drawHexGrid(x = 0, y = 0, width = 10, height = 10, hexHeight = 50, color = '#ffffff', lineWidth = 1) {
        // set settings
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;

        // calculate hex params
        let R = hexHeight / 2;
        let r = 0.86602540378443864676372317075294 * R; // r = R * cos(30)

        // // draw a single hex at x, y
        // this.drawPoint(x, y, 2, '#ff0000', `C`, '#ff0000', '20px Monospace');
        // this.drawPoint(x+r, y+R, 2, '#ff0000', `M`, '#ff0000', '20px Monospace');
        // this.drawHex(x+r, y+R, R, r, color, lineWidth);

       // calculate hex grid params
        let hexWidth = 2 * r; 

        // draw full tiling hex grid
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                // calculate hex position
                let hexX = x + (i * hexWidth);
                let hexY = y + (j * (hexHeight-R/2)); //???
                // offset every other row
                if (j % 2 == 1) {
                    hexX += hexWidth / 2;
                    // don't draw last hex in row
                    if (i == width - 1) {
                        continue;
                    }
                }

                // draw hex
                this.drawHex(hexX, hexY, R, r, color, lineWidth);
            }
        }
    }


    // update should be overwriten by child classes
    update() {
        // black background
        this.fill('#000000');
        //draw frame rate
        this.drawFps(Cycle.getInstance().fps);

        // draw hex grid
        this.drawHexGrid(100, 100, 10, 10, 100 );
    }
}