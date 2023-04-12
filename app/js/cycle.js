// debug
// console.log('cycle.js');

const Cycle = class Cycle extends Singleton {
    constructor() {
        super();
        // get canvas Singleton instance
        this.canvas = Canvas.getInstance();

        // TEMPORARY: create a new HexRenderer to display fps
        this.hexRenderer = new HexRenderer(this.canvas);
        this.fps =-1;
    }

    // update function
    update = (fps) => {
        // TEMOPRARY: hexRenderer
        this.hexRenderer.fill('#000000');
        this.hexRenderer.drawString(fps, 10, 10);
    }

    // Update cycle
    cycle = async (maxFps) => {
        let minFrameTime = 1000 / maxFps;
        let lastFrameEnd = performance.now();
        while (true) {
            //trim fps to 2 decimal places with always 3 digits before decimal
            this.fps = Math.round(this.fps * 100) / 100;
            this.fps = this.fps.toString().padStart(6, '0');
            //update();
            this.update(this.fps);

            //wait for next frame
            await new Promise(resolve => requestAnimationFrame(resolve));

            // limit frame rate
            let frameTime = performance.now() - lastFrameEnd;
            if (frameTime < minFrameTime) {
                await new Promise(resolve => setTimeout(resolve, minFrameTime - frameTime));
            }
            this.fps = 1000 / (performance.now() - lastFrameEnd);
            lastFrameEnd = performance.now();
        }
    }


    // start cycle
    start = (maxFps = 10) => {
        this.cycle(maxFps);
    }
}