import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../consts/canvas-consts";

export default class LineAnimation {
    constructor(store, page) {       
        this._w = CANVAS_WIDTH;
        this._h = CANVAS_HEIGHT;
        this._canvas = page.waveCanvas;
        this._store = store;

        this.actions = {
            pressed: false,
            pressValue: false,
        };
        //window.requestAnimationFrame(this.animate)
        setInterval(() => {
            this.animate()
        }, 0);
        this.setLine()

        page.onCanvasPress(this.press)
        //page.onCanvasMove(() => console.log('move'));
        page.onCanvasUp(this.up)
    }
    press = () => {
        this.actions.pressed = true
    }

    up = () => {
        this.actions.pressed = false
        this.actions.pressValue = !this.actions.pressValue;
    }
    // lineChangeMoveUp = () => {
    //     const lines = this._store.getLines();

    //     lines.forEach(line => {
    //         line.vy = -1;
    //     });
    // } 


    setLine = () => {
        //this._canvas.drawLine({x:100, y:100, prevX:80, prevY:80, r:2, color:'black'})
        const line = {
            x:0, 
            y: this._h/2, 
            vy: 0,
            r:2, 
            color:'black',
            t:1,
            vx:1,
        };

        this._store.addLine(line);
    }
    
    animate = () => {
        const lines = this._store.getLines();
        console.log(lines);
        
        lines.forEach(line => {
            if (this.actions.pressed && !this.actions.pressValue) {
                line.color = 'yellow'
                line.vy = -1;
            } else if (this.actions.pressed && this.actions.pressValue) {
                line.color = 'red'
                line.vy = 1;
            } else {
                line.color = 'black'
                line.vy = 0;
            }
            this._canvas.drawLine(line)
        });

        const lastPoint = {...lines[lines.length - 1]}
        this.lineMove(lastPoint)
    }

    lineMove = (line) => {
        line.prevX = line.x
        line.prevY = line.y

        line.y += line.vy * line.t;
        line.x += line.vx * line.t;
    
        this._store.addLine(line);
    }
}