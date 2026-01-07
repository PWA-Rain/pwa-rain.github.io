/*********************************************************
 * 
 * Rain ripple
 *   Ripples on the water surface.
 * 
 *********************************************************/

const RIPPLE_COLOR = "blue"
const RIPPLE_NUM = 10;
const RIPPLE_STEP = 50;

export class Rain {
    
    constructor() {
        this.ripples = [];
    }

    #init(canvas) {
        this.canvas_w = canvas.width;
        this.canvas_h = canvas.height;
        this.context = canvas.getContext('2d');
    }

    start(canvas) {
        this.#init(canvas)
        this.#tick();
    }
    #tick() {
        this.animationId = requestAnimationFrame(this.#tick.bind(this));
        this.#draw();
    }

    restart(canvas) {
        this.stop();
        this.start(canvas);
    }

    stop() {
        cancelAnimationFrame(this.animationId);
    }

    #draw() {
        if(this.ripples.length < RIPPLE_NUM) {
            const _x = Math.floor(Math.random() * this.canvas_w);
            const _y = Math.floor(Math.random() * this.canvas_h);
            const _step = Math.floor(Math.random() * RIPPLE_STEP);
            const _ripple = new _Ripple(this.context, _x, _y, _step)
            this.ripples.push(_ripple)
        }
        this.context.clearRect(0, 0, this.canvas_w, this.canvas_h);
        for(let _index in this.ripples) {
            const _result = this.ripples[_index].draw()
            if(!_result) {
                this.ripples.splice(_index, 1)
            }
        }
    }
}

class _Ripple {

    constructor(context, x, y, step) {
        this.context = context;
        this.center_x = x;
        this.center_y = y;
        this.radius = 0;
        this.step = step;
    }

    draw() {
        this.context.beginPath();
        this.context.strokeStyle = RIPPLE_COLOR;
        this.context.arc(
            this.center_x, this.center_y, this.radius, 
            0, Math.PI * 2, true
        );
        this.context.stroke();

        this.radius += 5;
        this.step --;

        if(this.step > 0) return true; 
        else return false;
    }
}