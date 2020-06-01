import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../consts/canvas-consts";

export default class LineAnimation {
    constructor(store, page) {       
        this._w = CANVAS_WIDTH;
        this._h = CANVAS_HEIGHT;

        this.isStop = false;
        //window.requestAnimationFrame(this.animate)
        // setInterval(() => {
        //     this.animate()
        // }, 0);
        this.setLine()

      
        page.onCanvasPress(() => console.log('press'))
        page.onCanvasMove(() => console.log('move'));
        page.onCanvasUp(() => console.log('up'))
    }

    setLine = () => {

    }
}