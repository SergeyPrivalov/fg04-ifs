function Fractal(left,top,right,bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.canvas;
    this.n;
    this.canvasWidth;
    this.canvasHeight;
    this.context;

    this.readValues = function (){
        this.canvas = document.getElementById("canvas");
        this.n = parseInt(document.getElementById("number").value);
        this.canvasHeight = parseInt(this.canvas.getAttribute("height"));
        this.canvasWidth = parseInt(this.canvas.getAttribute("width"));
        this.context = fractal.canvas.getContext('2d');
    };

    this.getNewCoordinat = function (x, y) {
        var i = x * (this.right - this.left) / (this.canvasWidth - 1) + this.left;
        var j = y * (this.bottom - this.top) / (this.canvasHeight - 1) + this.top;
        return {x: i, y: j};
    };

    this.getCanvasCoordinat = function (x, y) {
        var i = Math.round(x * (this.canvasWidth - 1) / 4 + 300);
        var j = Math.round(-y * (this.canvasWidth - 1) / 4 + 300);
        return {x: i, y: j};
    }
}

fractal = new Fractal(-2,2,2,-2);

function makeFractal() {
    fractal.readValues();
    fractal.context.lineWidth = "1";
    fractal.context.strokeStyle = "#00FF00";
    fractal.context.fillStyle = "#0000FF";
    fractal.context.fillRect(0, 0, fractal.canvasWidth, fractal.canvasHeight);
    var imageData = fractal.context.createImageData(fractal.canvasWidth, fractal.canvasHeight);
    findNewPoint(450, 300, fractal.n, fractal.context,imageData);
    fractal.context.putImageData(imageData, 0, 0);
}

function findNewPoint(x0,y0,n,context,imageData) {
    if (n == 0) {
        return 0;
    }
    var coords = fractal.getNewCoordinat(x0, y0);
    var x1, y1;
    var r = getRandomNumber();
    if (r > 50) {
        x1 = (coords.x + coords.y) / 2;
        y1 = (-coords.x + coords.y) / 2;
    }
    else {
        x1 = (-coords.x + coords.y) / 2 - 1;
        y1 = (-coords.x - coords.y) / 2;
    }
    var start = fractal.getCanvasCoordinat(x1, y1);
    drawPoint(start.x, start.y, context ,imageData);
    return findNewPoint(start.x, start.y, n - 1, context,imageData);
}

function drawPoint(x1,y1,context,imageData){
    imageData.data[4*(x1 + fractal.canvasWidth*y1) + 0] = 0;
    imageData.data[4*(x1 + fractal.canvasWidth*y1) + 1] = 0;
    imageData.data[4*(x1 + fractal.canvasWidth*y1) + 2] = 0;
    imageData.data[4*(x1 + fractal.canvasWidth*y1) + 3] = 255;
    context.putImageData(imageData, 0, 0);
}

function getRandomNumber(){
    return Math.round(Math.random() * 100);
}
/**
 * Created by smpri on 18.04.2016.
 */
