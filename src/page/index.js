import Canvas from "../Canvas";
import './style.less'
// import { Bottom } from "./Layout/Bottom";
// import { Header } from "./Layout/Header";

export default class Page { 
    constructor() {
        this.waveCanvas = new Canvas();
        this._canvas = this.waveCanvas._canvas;
        this._canvas.style.border = "3px solid black";
        this._root = document.getElementById('root');

        const canvasWrapper = document.createElement('div');
        canvasWrapper.className = 'canvas-wrapper'
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper'

        // this.bottom = new Bottom();
        // this.header = new Header();

        canvasWrapper.append(this._canvas)

        wrapper.append(...[canvasWrapper])
        this._root.append(wrapper);
    
    }  
    onCanvasPress = (cb) => {
        this._canvas.onmousedown = () => {
            cb();
        }
    }

    onCanvasMove = (cb) => {
        this._canvas.onmousemove = () => {
            cb();
        }
    }

    onCanvasUp = (cb) => {
        this._canvas.onmouseup = () => {
            cb();
        }
    }
}