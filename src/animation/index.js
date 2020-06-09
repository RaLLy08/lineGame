import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../consts/canvas-consts";
import { LINE_LENGTH, LINE_END } from "../consts/line-consts";
// import '../sounds/sound2.mp3'
// import '../sounds/sound3.mp3'
import '../sounds/tick.mp3'


export default class LineAnimation {
    constructor(store, page) {       
        this._canvas = page.waveCanvas;
        this._linesStore = store.lines;
        this._bariersStore = store.bariers;

        this.isStop = false;
        this.actions = {
            pressed: false,
            pressValue: false,
        };
        this.maxHole = 50;
        this.minTop = 300;
        this.maxTop = CANVAS_HEIGHT - 300;
        this.lineYspeed = 1;
        this.lineXspeed = 1;
        this.bariersSpeed = 1;
        this.speedLimit = 7
        this.score = {
            value: 0,
            color: 'black'
        }; //or number of crossed bariers 
        window.requestAnimationFrame(this.animate)
        // setInterval(() => {
        //     this.animate()
        // }, 0);
        this.init();

        page.onCanvasPress(this.press)
        page.onCanvasUp(this.up)
        
        //this.music = new Audio('sounds/sound2.mp3');
        // this.nextMusic = new Audio('sounds/sound3.mp3');
        this.barierSound = new Audio('sounds/tick.mp3');
        ///-----TEMP-----
        // setTimeout(() => {
        //     this.playMusic();
        // }, 100);
        ///-----TEMP-----
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
            y: CANVAS_HEIGHT/2, 
            r: 4, 
            color:'black',
        };

        this._linesStore.addLine(line);
    }
    
    setBariers = () => {
        // const top = 200;
        // const bottom = 220;
        //const hole = this.getRand(this.minHole, this.maxHole);
        const top = this.getRand(this.minTop, this.maxTop)
        const bottom = top + this.maxHole;
        
        const topBarier = {
            x: CANVAS_WIDTH,
            y: top,
            prevY: 0,
            color: 'blue',
            r: 10,
            vx: 1,
            id: 1,
        }
        //this._bariersStore.addBarier(barier);     
        
        const bottomBarier = {
            x: CANVAS_WIDTH,
            y: bottom,
            prevY: CANVAS_HEIGHT,
            color: 'red',
            r: 10,
            vx: 1,
            id: 1,
        }
       
        this._bariersStore.addBarier([topBarier, bottomBarier]);  
        // this._bariersStore.addBarier(barier4); 
    }

    animate = () => {
        if (!this.isStop) {
            this.lineAnimation();
            this.barierAnimation(); 
            ///-----TEMP-----
            // if (this.score.value > 19) {
            //     this.playNextMusic();
            // }
            ///-----TEMP-----
            this._canvas.draw(
            [
                ...this._linesStore.getLines(), 
                ...this._bariersStore.getBariers().flat()
            ], 
            this.score
            );
        }
        window.requestAnimationFrame(this.animate)
    }

    lineAnimation = () => {
        const lines = this._linesStore.getLines();
        const last = lines[lines.length - 1];
        
        lines.forEach(line => {
            this.changeDirection(line)
            
            if (last.x > LINE_END) {
                line.xIsStop = true
                line.x -= this.lineXspeed;
                line.prevX -= this.lineXspeed;
            }
        });

        if (lines.length > LINE_LENGTH) lines.shift();
        const newLast = {...lines[lines.length - 1]}

        this.move(newLast)
        this._linesStore.addLine(newLast);
        this.crossingBarier(newLast)
    }

    crossingBarier = (line) => {
        const bariers = this._bariersStore.getBariers();
 
        bariers.forEach(barier => {
            const top = barier[0];
            const bottom = barier[1];
            const isCrossed = Math.abs(top.x - line.x) <= this.lineXspeed;
            const holeRange = bottom.y - top.y;
            const isInHole = (Math.abs(line.y - top.y) < holeRange) && (line.y - top.y) > 0;
            //if the diff is not negative and not bigger then hole
            if (top.isCrossed) {
                this.changeBariersPosition(top, bottom)
            }
            if (isCrossed && !isInHole) {
                if (confirm(`game over! \nscore: ${this.score.value}`)) {
                    location.reload()
                }
                this.isStop = true;
            }
            // line crossed and barier is not the same
            if (isCrossed && !top.isCrossed) {
                this.changeScore(top.id);
                top.isCrossed = true;
                this.barierSound.play();
                
                if (this.speedLimit > this.bariersSpeed) {
                    this.lineYspeed += 0.2;
                    this.lineXspeed += 0.2;
                    this.bariersSpeed += 0.2;
                }
            }
        });
    } 

    changeScore = (value) => {
        this.score.value = value;
        if (value > 15) {
            this.score.color = 'blue';
        } else {
            this.score.color = 'black';
        }
    }

    changeBariersPosition = (top, bottom) => {
        if (this.score.value > 6) {
            top.y -= 5
            bottom.y += 5
        } 
        if (this.score.value > 9) {
            top.y -= 5
            bottom.y += 5
        } 
        if (this.score.value > 15) {
            bottom.x -= 4
            top.x -= 4 
        }
        if (this.score.value > 24) {
            bottom.x -= 10
            top.x -= 10
        }
    }

    barierAnimation = () => {
        const bariers = this._bariersStore.getBariers();
        
        bariers.forEach(barier => {
            //this.changeDirection(barier)
            const top = barier[0];
            const bottom = barier[1];
  
            //spawn a new barier
            if (top.x < 0) {
                //creatin new barier
                top.x = CANVAS_WIDTH;
                bottom.x = CANVAS_WIDTH;
                
                top.y = this.getRand(this.minTop, this.maxTop);
                bottom.y = top.y + this.maxHole;
                top.id += 1;
                top.isCrossed = false;

                this._bariersStore.clearAllBariers()
                this._bariersStore.addBarier([top, bottom]);
            }
         
            this.moveBariers(top);
            this.moveBariers(bottom);
        });
    }

    changeDirection = (line) => {
        if (this.actions.pressed && !this.actions.pressValue) {
            line.color = 'yellow'
            line.vy = -this.lineYspeed;
        } else if (this.actions.pressed && this.actions.pressValue) {
            line.color = 'red'
            line.vy = this.lineYspeed;
        } else {
            line.color = 'black'
            line.vy = 0;
        }

    }

    move = (opts) => {
        opts.prevX = opts.x
        opts.prevY = opts.y

        if (!opts.xIsStop) opts.xt = opts.t;

        opts.y += opts.vy;
        opts.x += this.lineXspeed; 
    }

    moveBariers = (opts) => {
        opts.prevX = opts.x - this.bariersSpeed
        opts.x -= this.bariersSpeed; 
    }
    ///-----TEMP-----
    playMusic = () => {
        this.music.play()
        this.music.loop = true
        
    }

    playNextMusic = () => {
        this.music.loop = false
        this.music.pause()

        this.nextMusic.play()
        this.nextMusic.loop = true;
    }
    ///-----TEMP-----
    getRand = (min, max) => (Math.random() * (max - min) ) + min;  
}