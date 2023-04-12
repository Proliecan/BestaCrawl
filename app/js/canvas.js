const Canvas = class Canvas extends Singleton {
    resizeCanvas = () => {
        this.canvasObject.width = window.innerWidth;
        this.canvasObject.height = window.innerHeight;
    }

    constructor() {
        super();
        this.canvasObject = document.getElementById('canvas');
        this.ctx = this.canvasObject.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas, false);
    }
}
