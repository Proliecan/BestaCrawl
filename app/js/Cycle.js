const Cycle = class Cycle extends Singleton {
    constructor() {
        super();
        // get canvas Singleton instance
        this.canvas = Canvas.getInstance();
        
        // render callbacks
        this.renderCallbacks = [];
    }

    // register render callback
    registerRenderCallback = (callback) => {
        this.renderCallbacks.push(callback);
    }

    // update function
    update = () => {
        // render callbacks
        this.renderCallbacks.forEach(callback => {
            callback();
        });
    }

    // Update cycle
    cycle = async (maxFps) => {
        let minFrameTime = 1000 / maxFps;
        let lastFrameEnd = performance.now();
        while (true) {
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