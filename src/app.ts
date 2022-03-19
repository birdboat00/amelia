import { LoopMode } from "./loopmode.js";
import { Pen } from "./draw/pen.js";
import { Nullable } from "./util.js";

export type ViewFunction = (app: App, model: any) => void;
export type ModelFunction = (app: App) => any;

/**
 * An amelia @type {App} builder.
 */
export class AppBuilder {
    private viewFn: ViewFunction;
    private modelFn: ModelFunction;
    private parentElementId?: string;
    private canvasWidth: number;
    private canvasHeight: number;
    private loopMode: LoopMode;

    constructor() {
        this.viewFn = (app: App, model: any) => { };
        this.modelFn = (app: App): any => { };

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
    view(viewfn: ViewFunction): this {
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
    model(modelfn: ModelFunction): this {
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
    size(width: number, height: number): this {
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
    parent(parentDomElementId: string): this {
        this.parentElementId = parentDomElementId;
        return this;
    }

    ntimes(times: number): this {
        this.loopMode = { type: "ntimes", times: times };
        return this;
    }

    once(): this {
        this.loopMode = { type: "ntimes", times: 1 };
        return this;
    }

    refreshsync(): this {
        this.loopMode = { type: "refreshsync" };
        return this;
    }

    framerate(framesPerSecond: number): this {
        this.loopMode = { type: "framerate", frameRate: framesPerSecond };
        return this;
    }

    run(): App {
        let app = new App(this.viewFn, this.modelFn, this.parentElementId || null, this.canvasWidth, this.canvasHeight, this.loopMode);
        app.run();
        return app;
    }

    quickstart(viewfn: ViewFunction, width: number = 400, height: number = 400): App {
        this.view(viewfn);
        this.size(width, height);
        return this.run();
    }
}

export class App {
    private viewFn: ViewFunction;
    private modelFn: ModelFunction;
    private model: any;
    private canvasWidth: number;
    private canvasHeight: number;
    private canvas?: HTMLCanvasElement = undefined;
    private parentElemId: Nullable<string>;
    private loopMode: LoopMode;
    private appPen: Nullable<Pen>;

    private frames: number;

    constructor(viewfn: ViewFunction, modelfn: ModelFunction,
        parentElemId: string | null, width: number, height: number,
        loopmode: LoopMode) {
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
        } else {
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

    private loop(timestamp: DOMHighResTimeStamp): void {
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

    iterations(): number {
        return this.frames;
    }

    pen(): Pen {
        return this.appPen as Pen;
    }

    get width(): number {
        return this.canvasWidth;
    }

    get height(): number {
        return this.canvasHeight;
    }

    loopmode(mode: LoopMode): this {
        this.loopMode = mode;
        return this;
    }
}

export function app(): AppBuilder {
    return new AppBuilder();
}