import { Backends } from "./backend/backends.mjs";
import { Drawer } from "./draw.mjs";

/**
 * The type describing the loop mode of the app.
 */
export class LoopMode {
    nTimes;
    frameRate;
    refreshSync;

    constructor(refreshSync, nTimes, frameRate) {
        this.refreshSync = refreshSync;
        this.nTimes = nTimes;
        this.frameRate = frameRate;
    }

    /**
     * Create a loop mode that uses requestAnimationFrame()
     * @returns {LoopMode}
     */
    static RefreshSync() { return new LoopMode(true, null, null); }
    /**
     * Create a loop mode that uses setTimeout at the specified frame rate.
     * The framerate is specified at frames per second.
     * @param {number} framerate - the framerate the app should run at.
     * @returns {LoopMode}
     */
    static FrameRate(framerate) { return new LoopMode(null, null, framerate); }
    /**
     * Create a loop mode that loops a specific number of times and
     * the stops the app.
     * @param {number} nTimes - the number of times that app should loop
     * @returns {LoopMode}
     */
    static NTimes(nTimes) { return new LoopMode(null, nTimes, null); }
    /**
     * Create a loop mode that loops the app once and then stops the app.
     * This is a shorthand for calling NTimes(1).
     * @returns {LoopMode}
     */
    static Once() { return new LoopMode(null, 1, null); }

    get isRefreshSync() { return this.refreshSync != null; }
    get isNTimes() { return this.nTimes != null; }
    get isFrameRate() { return this.frameRate != null; }
}

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
    parentElemId;
    loopMode;

    constructor() {
        this.viewFn = () => { };
        this.modelFn = () => { };
        this.mouseMoveFn = () => { };
        this.mousePressedFn = () => { };
        this.keyPressedFn = () => { };
        this.parentElemId = null;
        this.canvasSize = { w: 100, h: 100 };
        this.backend = Backends.Canvas2D;
        this.loopMode = LoopMode.RefreshSync();
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
     * If the size is not specified or less or equal to zero,
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
     * Specify the default canvas size using the @type {Size} type.
     *
     * If the size is less or equal to zero,
     * the default size will be 100x100 pixels.
     * @param {Size} sz - the size
     * @returns {AppBuilder}
     */
    sizeSz(sz) {
        return this.size(sz.width, sz.height);
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
     * Specify the DOM Element by its ID which should
     * be the parent of the canvas that the app creates.
     * @param {string} parentId - the DOM id
     * @returns {AppBuilder} - itself
     */
    parent(parentId) {
        this.parentElemId = parentId;
        return this;
    }

    /**
     * Specify the loop mode that the app should use.
     * @param {LoopMode} mode - the loop mode to use
     * @returns {AppBuilder}
     */
    loopmode(mode) {
        this.loopMode = mode;
        return this;
    }

    /**
     * Set the loop mode to LoopMode.Once().
     * Shorthand for loopmode(LoopMode.Once()).
     * @returns {AppBuilder}
     */
    once() {
        this.loopMode = LoopMode.Once();
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
        new App(fns, this.parentElemId, this.canvasSize, null, this.backend, this.loopMode).run();
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
    parentElemId;
    loopMode;

    fps;
    times;

    constructor(fns, parentElemId, size, canvas, backendKind, loopMode) {
        this.viewFn = fns.viewFn;
        this.modelFn = fns.modelFn;
        this.mouseMoveFn = fns.mouseMoveFn;
        this.keyPressFn = fns.keyPressedFn;
        this.mousePressFn = fns.mousePressedFn;
        this.size = size;
        this.canvas = canvas;
        this.frames = 0;
        this.backendKind = backendKind;
        this.parentElemId = parentElemId;
        this.loopMode = loopMode;

        this.drawer = null;

        this.times = [];
    }

    run() {
        if (this.canvas == null) {
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

            if(this.parentElemId) {
                let parentElem = document.getElementById(this.parentElemId);
                if(parentElem) {
                    parentElem.appendChild(this.canvas);
                } else {
                    console.warn(`The HTMLElement with id ${this.parentElemId} does not exist. Appending the canvas directly to the body.`);
                    document.body.appendChild(this.canvas);
                }
            } else {
                document.body.appendChild(this.canvas);
            }
        }

        this.drawer = new Drawer(this.canvas, this.backendKind);

        this.model = this.modelFn(this);

        if(this.loopMode.isRefreshSync) {
            requestAnimationFrame(this.#loop.bind(this));
        } else if (this.loopMode.isFrameRate) {
            setTimeout(this.#loop.bind(this), 1000 / this.loopMode.frameRate);
        } else if(this.loopMode.isNTimes && this.loopMode.nTimes > 0) {
            requestAnimationFrame(this.#loop.bind(this));
        }
    }

    #loop(ts) {
        let timestamp = ts || performance.now();
        while (this.times.length > 0 && this.times[0] <= timestamp - 1000) {
            this.times.shift();
        }
        this.times.push(timestamp);
        this.fps = this.times.length;

        this.viewFn(this, this.model);

        this.frames++;

        if(this.loopMode.isRefreshSync) {
            requestAnimationFrame(this.#loop.bind(this));
        } else if (this.loopMode.isFrameRate) {
            setTimeout(this.#loop.bind(this), 1000 / this.loopMode.frameRate);
        } else if (this.loopMode.isNTimes && this.frames < this.loopMode.nTimes) {
            requestAnimationFrame(this.#loop.bind(this));
        }
    }

    /**
     * Produce the App's Draw API for drawing geometry.
     * @returns {Drawer} draw API
     */
    draw() {
        return this.drawer;
    }

    /**
     * Produce the App's Draw API for drawing geometry
     * @returns {Drawer}
     */
    pen() {
        return this.drawer;
    }

    /**
     * The number of times the view function has been called
     * since the start of the program.
     * @returns {number} number of frames
     */
    iterations() {
        return this.frames;
    }

    /**
     * Specify the loop mode that the app should use.
     * This is used from the next frame on.
     * @param {LoopMode} mode - the loop mode to use
     * @returns {App}
     */
    loopmode(mode) {
        this.loopMode = mode;
        return this;
    }

    /**
     * The width of the app canvas
     */
    get width() {
        return this.canvas.width;
    }

    /**
     * The height of the app canvas
     */
    get height() {
        return this.canvas.height;
    }

    /**
     * Set the width of the app canvas
     */
    set width(width) {
        this.canvas.height = width;
    }

    /**
     * Set the height of the app canvas
     */
    set height(height) {
        this.canvas.height = height;
    }

    /**
     * Set the size of the app canvas using the
     * @type {Size} type.
     * @param {Size} size - the size that the canvas should be set to
     */
    size(size) {
        this.width = size.width;
        this.height = size.height;
    }
}