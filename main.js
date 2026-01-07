/*********************************************************
 * 
 * Application "Rain"
 * 
 *********************************************************/

import { Rain } from './rain.js';

let canvas = document.querySelector("#_canvas");
let rain = new Rain();

export function execRain() {

    /**
     * Canvas initialization
     */
    canvas.width = window.innerWidth;       // Canvas size
    canvas.height = window.innerHeight;     //   <- ViewPort size

    /**
     * Event settings
     */
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;   // Canvas size
        canvas.height = window.innerHeight; //   <- ViewPort size
        rain.restart(canvas);
    });

    /**
     * App execution
     */
    rain.start(canvas);
}