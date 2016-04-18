function makeFractal() {
    var n = parseInt(document.getElementById("number").value);
    var canvas = document.getElementById("canvas");
    var canvasHeight = parseInt(canvas.getAttribute("height"));
    var canvasWidth = parseInt(canvas.getAttribute("width"));
    var context = canvas.getContext('2d');
    context.lineWidth = "1";
    context.strokeStyle = "#00FF00";
    context.fillStyle = "#0000FF";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    findNewPoint(450, 300, n, context);
}
function findNewPoint(x0,y0,n,context) {
    if (n == 0) {
        return 0;
    }
    var coords = getNewCoords(x0,y0);
    x0 = coords.x;
    y0 = coords.y;
    var x1, y1;
    var r = getRandomNumber();
    if (r > 50) {
        x1 = (x0 + y0) / 2;
        y1 = (-x0 + y0) / 2;
    }
    else {
        x1 = (-x0 + y0) / 2 - 1;
        y1 = (-x0 - y0) / 2;
    }
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
    return findNewPoint(x1, y1, n - 1, context);
}
function getRandomNumber(){
    var min = 0;
    var max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getNewCoords(x,y) {
    return {x: 300 - x, y: 300 - y};
}
/**
 * Created by smpri on 18.04.2016.
 */
