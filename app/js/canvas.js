const Canvas = class Canvas extends Singleton {
    // renderFrame = () => {
    //     // draw something
    //     // console.log('renderFrame()');
    // }

    resizeCanvas = () => {
        this.canvasObject.width = window.innerWidth;
        this.canvasObject.height = window.innerHeight;

        // /**
        //  * Your drawings need to be inside this function otherwise they will be reset when 
        //  * you resize the browser window and the canvas will be cleared.
        //  */
        // // HERE: HANDLED BY AN ANIMATION CYCLE IN CYCLE.JS
        // this.renderFrame();
        // console.log('canvas resized');
    }

    constructor() {
        super();
        this.canvasObject = document.getElementById('canvas');
        this.ctx = this.canvasObject.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas, false);
    }
}
