// debug
// console.log('cycle.js');

// get canvas Singleton instance
const canvas = Canvas.getInstance();

// TEMPORARY: create a new HexRenderer to display fps
let hexRenderer = new HexRenderer(canvas);
// update function
const update = (fps) => {
    // update canvas
    hexRenderer.fill('#000000');
    hexRenderer.drawString(fps, 10, 10);
    console.log('canvas updated');
}

// Update cycle
async function cycle(maxFps) {
    let fps = 0;
    let minFrameTime = 1000 / maxFps;
    let lastFrameEnd = performance.now();
    while(true){
        //update();
        update(fps.toFixed(2));
        
        //wait for next frame
        await new Promise(resolve => requestAnimationFrame(resolve));

        // limit frame rate
        let frameTime = performance.now() - lastFrameEnd;
        if(frameTime < minFrameTime){
            await new Promise(resolve => setTimeout(resolve, minFrameTime - frameTime));
        }
        fps = 1000 / (performance.now() - lastFrameEnd);
        lastFrameEnd = performance.now();
    }
}

// start cycle
cycle(10);