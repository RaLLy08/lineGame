import { CANVAS_HEIGHT, CANVAS_WIDTH } from './consts/canvas-consts'

export default class Canvas {
    constructor() {
        this._h = CANVAS_HEIGHT;
        this._w = CANVAS_WIDTH;
        this._canvas = document.createElement('canvas');
        this._canvas.setAttribute('width', this._w);
        this._canvas.setAttribute('height', this._h);
        this._ctx = this._canvas.getContext('2d');
    }

    drawLines = (lines, bariers) => { 
        this.clearCanvas();

        lines.forEach(xyrc => {
            this.drawLine(xyrc);
        });

        // bariers.forEach(barier => {
        //     this.drawLine(barier);
        // });
        // this.drawLine(xyrc);
    }

    drawLine = xyrc => {
        const {x, y, prevX, prevY, r, color} = xyrc;
        //console.log(xyrc);
        this._ctx.beginPath(); 
        this._ctx.strokeStyle = color; 
        this._ctx.moveTo(prevX, prevY); 
        this._ctx.lineTo(x, y); 
        
        this._ctx.stroke(); 
        this._ctx.lineWidth = r;
        this._ctx.closePath()
    }

    drawBariers = (xyrc) => {
        this.clearCanvas();
        this.drawLine(xyrc);
    }

    clearCanvas = () => {
        this._ctx.clearRect(0, 0, this._w, this._h);
    }
}