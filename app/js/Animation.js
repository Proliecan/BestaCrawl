// Create renderer objects
const canvas = Canvas.getInstance()
const baseRenderer = new BaseRenderer(canvas);
const framerateRenderer = new FramerateRenderer(canvas);
const hexRenderer = new HexRenderer(canvas);

// start cycle
Cycle.getInstance().start(30);

// register for update cycle
Cycle.getInstance().registerRenderCallback(() => {
    baseRenderer.fill('#000000');

    // draw framerate
    framerateRenderer.drawFps(10, 20, '#ffffff');

    // draw hex grid
    hexRenderer.fillCanvasWithHexPattern(50);
});