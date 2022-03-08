import { Backends } from "./backend/backends.mjs";
import { Drawer } from "./draw.mjs";

/**
 * Begin building the @type {App}
 * @returns {AppBuilder} - the app builder
 */
export const app = () => {
    return new AppBuilder();
};

/**
 * An amelia @type {App} builder.
 */
export class AppBuilder {

    canvasSize;
    viewFn;
    modelFn;
    mouseMoveFn;
    mousePressedFn;
    keyPressedFn;
    backend;

    constructor() {
        this.viewFn = () => {};
        this.modelFn = () => {};
        this.mouseMoveFn = () => {};
        this.mousePressedFn = () => {};
        this.keyPressedFn = () => {};
        this.canvasSize = { w: 100, h: 100 };
        this.backend = Backends.Canvas2D;
    }

    /**
     * The default view function that the app will call to allow
     * you to draw to the current frame.
     * @param {*} viewFn - the view function that is called every frame
     * @returns {AppBuilder} - the app builder
     */
    view(viewFn) {
        this.viewFn = viewFn;

        return this;
    }

    /**
     * The default model function that the app will call before the
     * first frame.
     * @param {*} modelFn - the model function that is called before the first frame
     * @returns - the app builder
     */
    model(modelFn) {
        this.modelFn = modelFn;
        return this;
    }

    /**
     * The default function that is called when the mouse is moved.
     * @param {*} mouseMoveFn - the mouse move function
     * @returns {AppBuilder} - itself
     */
    mouseMove(mouseMoveFn) {
        this.mouseMoveFn = mouseMoveFn;
        return this;
    }

    /**
     * The default function that is called when the mouse is moved.
     * @param {*} mousePressedFn - the mouse press function
     * @returns {AppBuilder}
     */
    mousePress(mousePressedFn) {
        this.mousePressedFn = mousePressedFn;
        return this;
    }

    /**
     * The default function that is called when a key is pressed down.
     * @param {*} keyPressedFn - the key press function
     * @returns {AppBuilder}
     */
    keyPress(keyPressedFn) {
        this.keyPressedFn = keyPressedFn;
        return this;
    }

    /**
     * Specify the default canvas size in points.
     *
     * If the size is not specified or less than zero,
     * the default size of 100x100 will be used.
     * @param {number} w - width
     * @param {number} h - height
     * @returns {AppBuilder} - the app builder
     */
    size(w, h) {
        this.canvasSize.w = w <= 0 ? 100 : w;
        this.canvasSize.h = h <= 0 ? 100 : h;

        return this;
    }

    /**
     * Specify the default backend to use for the canvas
     * drawing.
     * @param {Backends} backend - the backend to use
     * @returns {AppBuilder} - the app builder
     */
    backend(backend) {
        this.backend = backend;
        return this;
    }

    /**
     * Build and run an @type {App} with the specified parameters.
     * This function will not return until the app has exited.
     */
    run() {
        const fns = {
            viewFn: this.viewFn,
            modelFn: this.modelFn,
            keyPressedFn: this.keyPressedFn,
            mousePressedFn: this.mousePressedFn,
            mouseMoveFn: this.mouseMoveFn
        };
        new App(fns, this.canvasSize, null, this.backend).run();
    }
}

export class App {

    viewFn;
    modelFn;
    mouseMoveFn;
    mousePressFn;
    keyPressFn;
    model;
    size;
    drawer;
    frames;
    canvas;
    backendKind;

    fps;
    times;

    constructor(fns, size, canvas, backendKind) {
        this.viewFn = fns.viewFn;
        this.modelFn = fns.modelFn;
        this.mouseMoveFn = fns.mouseMoveFn;
        this.keyPressFn = fns.keyPressedFn;
        this.mousePressFn = fns.mousePressedFn;
        this.size = size;
        this.canvas = canvas;
        this.frames = 0;
        this.backendKind = backendKind;

        this.drawer = null;

        this.times = [];
    }

    run() {
        if(this.canvas == null) {
            this.canvas = document.createElement("canvas");
            this.canvas.width = this.size.w;
            this.canvas.height = this.size.h;

            this.canvas.addEventListener("mousedown", (ev) => {
                this.mousePressFn(this, this.model, ev);
            });
            this.canvas.addEventListener("mousemove", (ev) => {
                this.mouseMoveFn(this, this.model, ev);
            });
            document.addEventListener("keydown", (ev) => {
                this.keyPressFn(this, this.model, ev);
            });

            document.body.appendChild(this.canvas);
        }

        this.drawer = new Drawer(this.canvas, this.backendKind);

        this.model = this.modelFn(this);

        requestAnimationFrame(this.#loop.bind(this));
    }

    #loop(timestamp) {

        while(this.times.length > 0 && this.times[0] <= timestamp - 1000) {
            this.times.shift();
        }
        this.times.push(timestamp);
        this.fps = this.times.length;

        this.viewFn(this, this.model);

        this.frames++;

        requestAnimationFrame(this.#loop.bind(this));
    }

    /**
     * Produce the App's Draw API for drawing geometry.
     * @returns {Drawer} draw API
     */
    draw() {
        return this.drawer;
    }

    /**
     * The number of times the view function has been called
     * since the start of the program.
     * @returns {number} number of frames
     */
    elapsedFrames() {
        return this.frames;
    }

    fps() {
        return this.fps;
    }

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }
}