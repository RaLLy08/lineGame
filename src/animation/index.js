import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../consts/canvas-consts";
import { LINE_LENGTH, LINE_END } from "../consts/line-consts";

export default class LineAnimation {
    constructor(store, page) {       
        this._w = CANVAS_WIDTH;
        this._h = CANVAS_HEIGHT;
        this._canvas = page.waveCanvas;
        this._linesStore = store.lines;
        this._bariersStore = store.bariers;

        this.actions = {
            pressed: false,
            pressValue: false,
        };
        //window.requestAnimationFrame(this.animate)
        setInterval(() => {
            this.animate()
        }, 0);
        this.init();

        page.onCanvasPress(this.press)
        page.onCanvasUp(this.up)
    }
    press = () => {
        this.actions.pressed = true
    }

    up = () => {
        this.actions.pressed = false
        this.actions.pressValue = !this.actions.pressValue;
    }
    
    init = () => {
        this.setLine()
        this.setBariers();
    }

    setLine = () => {
        //this._canvas.drawLine({x:100, y:100, prevX:80, prevY:80, r:2, color:'black'})
        const line = {
            x: 0, 
            y: this._h/2, 
            vy: 0,
            r: 1, 
            color:'black',
            t: 1,
            vx: 1,
        };

        this._linesStore.addLine(line);
    }
    
    setBariers = () => {
        // const top = 200;
        // const bottom = 220;
        const maxHole = 100;
        const minHole = 10;
        const top = Math.random() * 780;
        const bottom = Math.random() * ((top + maxHole) - top) + top;

        const barier = {
            x: CANVAS_WIDTH,
            y: top,
            prevX: 0,
            prevY: 0,
            color: 'red',
            r: 2,
            vy: 0,
            vx: 1,
            t: 1,
        }
        //this._bariersStore.addBarier(barier);     
        
        const barier2 = {
            x: CANVAS_WIDTH,
            y: bottom,
            prevX: 0,
            prevY: 900,
            color: 'red',
            r: 2,
            vy: 0,
            vx: 1,
            t: 1,
        }
        this._bariersStore.addBarier([barier, barier2]);  
        // const barier3 = {
        //     x: CANVAS_WIDTH - 100,
        //     y: 500,
        //     prevX: 0,
        //     prevY: 0,
        //     color: 'red',
        //     r: 2,
        //     vy: 0,
        //     vx: 1,
        //     t: 1,
        // }
        // this._bariersStore.addBarier(barier3);     
        
        // const barier4 = {
        //     x: CANVAS_WIDTH - 100,
        //     y: 1000,
        //     prevX: 0,
        //     prevY: 800,
        //     color: 'red',
        //     r: 2,
        //     vy: 0,
        //     vx: 1,
        //     t: 1,
        // }
        // this._bariersStore.addBarier(barier4); 
    }

    animate = () => {
        this.lineAnimation();
        this.barierAnimation(); 

        this._canvas.drawLines([
            ...this._linesStore.getLines(), 
            ...this._bariersStore.getBariers().flat()
        ]);
       
    }

    lineAnimation = () => {
        const lines = this._linesStore.getLines();
        const last = {...lines[lines.length - 1]};

        lines.forEach(line => {
            this.changeDirection(line)

            if (line.xIsStop) {
                line.x -= 1;
                line.prevX -= 1;
            }
            
            if (last.x > LINE_END) {
                line.xIsStop = true
            }
        });
        if (lines.length > LINE_LENGTH) lines.shift();
        const lastPoint = {...lines[lines.length - 1]}

        this.move(lastPoint)
        this._linesStore.addLine(lastPoint);
    }

    barierAnimation = () => {
        const bariers = this._bariersStore.getBariers();
        
        bariers.forEach((barier, i) => {
            //this.changeDirection(barier)
            const top = barier[0];
            const bottom = barier[1];
            // if (barier.xIsStop) {
            //     barier.x -= 1;
            //     barier.prevX -= 1;
            // }
            if (top.x < 0) {
                top.x = CANVAS_WIDTH;
                bottom.x = CANVAS_WIDTH;
                const maxHole = 100;
                const minHole = 10;
                top.y = Math.random() * 780;
                bottom.y = Math.random() * ((top.y + maxHole) - (top.y + minHole)) + (top.y + minHole);
            }
         

            this.moveBariers(top);
            this.moveBariers(bottom);
        });
    }

    changeDirection = (line) => {
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
    }

    move = (opts) => {
        //console.log(opts);
        opts.prevX = opts.x
        opts.prevY = opts.y

        if (!opts.xIsStop) opts.xt = opts.t;

        opts.y += opts.vy * opts.t;
        opts.x += opts.vx * opts.xt; 
    }

    moveBariers = (opts) => {
        //console.log(opts);
        opts.prevX = opts.x
        //opts.prevY = opts.y

        if (!opts.xIsStop) opts.xt = opts.t;

        //opts.y += opts.vy * opts.t;
        opts.x -= opts.vx * opts.xt; 
    }
}