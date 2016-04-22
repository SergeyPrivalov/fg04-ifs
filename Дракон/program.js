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

    this.readValues = function () {
        this.canvas = document.getElementById("canvas");
        this.n = parseInt(document.getElementById("number").value);
        this.canvasHeight = parseInt(this.canvas.getAttribute("height"));
        this.canvasWidth = parseInt(this.canvas.getAttribute("width"));
        this.context = fractal.canvas.getContext('2d');
    };

    this.getSmallAreaCoordinat = function (x, y) {
        var i = x * (this.right - this.left) / (this.canvasWidth - 1) + this.left;
        var j = y * (this.bottom - this.top) / (this.canvasHeight - 1) + this.top;
        return {x: i, y: j};
    };

    this.getCanvasCoordinat = function (x, y) {
        var i = Math.round(x * (this.canvasWidth - 1) / 4 + this.canvasWidth / 2);
        var j = Math.round(-y * (this.canvasWidth - 1) / 4 + this.canvasHeight / 2);
        return {x: i, y: j};
    };

    this.createImageData = function () {
        return this.context.createImageData(this.canvasWidth, this.canvasHeight);
    }
}

fractal = new Fractal(-2,2,2,-2);

function makeFractal() {
    fractal.readValues();
    var imageData = fractal.createImageData();
    for (var i = 0; i < fractal.canvasWidth; i++) {
        for (var j = 0; j < fractal.canvasHeight; j++) {
            var red = 0;
            var green = 0;
            var blue = 0;
            var opacity = 255;
            imageData.data[4 * (i + fractal.canvasWidth * j) + 0] = red;
            imageData.data[4 * (i + fractal.canvasWidth * j) + 1] = green;
            imageData.data[4 * (i + fractal.canvasWidth * j) + 2] = blue;
            imageData.data[4 * (i + fractal.canvasWidth * j) + 3] = opacity;
        }
    }
    findNewPoint(300, 300, fractal.n, imageData);
    fractal.context.putImageData(imageData, 0, 0);
}

function findNewPoint(x0,y0,n,imageData) {
    for (var i = 0; i < n; ++i) {
        var coords = fractal.getSmallAreaCoordinat(x0, y0);
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
        drawPoint(start.x, start.y,i, imageData);
        x0 = start.x;
        y0 = start.y;
    }
    return 0;
}

function drawPoint(x1,y1,k,imageData) {
    var brightness = 255 * k / (fractal.n - 1);
    imageData.data[4 * (x1 + fractal.canvasWidth * y1) + 0] = 0;
    imageData.data[4 * (x1 + fractal.canvasWidth * y1) + 1] = brightness;
    imageData.data[4 * (x1 + fractal.canvasWidth * y1) + 2] = brightness;
    imageData.data[4 * (x1 + fractal.canvasWidth * y1) + 3] = brightness;
}

function getRandomNumber() {
    return Math.round(Math.random() * 100);
}
/**
 * Created by smpri on 18.04.2016.
 */
