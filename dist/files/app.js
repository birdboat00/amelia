import { Pen } from "./draw/pen.js";
/**
 * An amelia @type {App} builder.
 */
export class AppBuilder {
    constructor() {
        this.viewFn = (app, model) => { };
        this.modelFn = (app) => { };
        this.parentElementId = undefined;
        this.canvasWidth = 100;
        this.canvasHeight = 100;
        this.loopMode = { type: "refreshsync" };
    }
    /**
     * The default view function that the app will every
     * frame to allow you to plot to the canvas.
     * @param viewfn the view function
     * @returns {AppBuilder}
     */
    view(viewfn) {
        this.viewFn = viewfn;
        return this;
    }
    /**
     * The default model function that the app will call
     * before the first frame. Allows you to provide your
     * app state.
     * @param modelfn the model function
     * @returns {AppBuilder}
     */
    model(modelfn) {
        this.modelFn = modelfn;
        return this;
    }
    /**
     * Specify the default canvas size in pixels.
     *
     * If the size is not specified or less or equal to zero
     * the default size of 100x100 pixels will be used.
     * @param width the width in pixels
     * @param height the height in pixels
     * @returns {AppBuilder}
     */
    size(width, height) {
        this.canvasWidth = width <= 0 ? 100 : width;
        this.canvasHeight = height <= 0 ? 100 : height;
        return this;
    }
    /**
     * Specify the DOM element ID that the app should
     * append the canvas to as child.
     * @param parentDomElementId the id of the parent element in the DOM
     * @returns {AppBuilder}
     */
    parent(parentDomElementId) {
        this.parentElementId = parentDomElementId;
        return this;
    }
    ntimes(times) {
        this.loopMode = { type: "ntimes", times: times };
        return this;
    }
    once() {
        this.loopMode = { type: "ntimes", times: 1 };
        return this;
    }
    refreshsync() {
        this.loopMode = { type: "refreshsync" };
        return this;
    }
    framerate(framesPerSecond) {
        this.loopMode = { type: "framerate", frameRate: framesPerSecond };
        return this;
    }
    run() {
        let app = new App(this.viewFn, this.modelFn, this.parentElementId || null, this.canvasWidth, this.canvasHeight, this.loopMode);
        app.run();
        return app;
    }
    quickstart(viewfn, width = 400, height = 400) {
        this.view(viewfn);
        this.size(width, height);
        return this.run();
    }
}
export class App {
    constructor(viewfn, modelfn, parentElemId, width, height, loopmode) {
        this.canvas = undefined;
        this.viewFn = viewfn;
        this.modelFn = modelfn;
        this.parentElemId = parentElemId;
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.appPen = null;
        this.loopMode = loopmode;
        this.frames = 0;
    }
    run() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        if (this.parentElemId) {
            const parentElem = document.getElementById(this.parentElemId) || document.body;
            parentElem.appendChild(this.canvas);
        }
        else {
            document.body.appendChild(this.canvas);
        }
        this.appPen = new Pen(this.canvas);
        this.model = this.modelFn(this);
        switch (this.loopMode.type) {
            case "refreshsync":
            case "ntimes":
                requestAnimationFrame(this.loop.bind(this));
                break;
            case "framerate":
                setTimeout(this.loop.bind(this), 1000 / this.loopMode.frameRate);
                break;
        }
    }
    loop(timestamp) {
        this.viewFn(this, this.model);
        switch (this.loopMode.type) {
            case "refreshsync":
                requestAnimationFrame(this.loop.bind(this));
                break;
            case "framerate":
                setTimeout(this.loop.bind(this), 1000 / this.loopMode.frameRate);
                break;
            case "ntimes":
                if (this.frames < this.loopMode.times) {
                    requestAnimationFrame(this.loop.bind(this));
                }
        }
    }
    iterations() {
        return this.frames;
    }
    pen() {
        return this.appPen;
    }
    get width() {
        return this.canvasWidth;
    }
    get height() {
        return this.canvasHeight;
    }
    loopmode(mode) {
        this.loopMode = mode;
        return this;
    }
}
export function app() {
    return new AppBuilder();
}
