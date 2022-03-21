import { getBackendInstance } from "../backend/backends.mjs";
import { ArcPrimitive } from "./arc.mjs";
import { Background } from "./background.mjs";
import { BezierPrimitive } from "./bezier.mjs";
import { LinePrimitive } from "./line.mjs";
import { ModifyPixelBuffer } from "./pixelbuffer.mjs";
import { PointPrimitive } from "./point.mjs";
import { PolygonPrimitive } from "./polygon.mjs";
import { RectPrimitive } from "./rect.mjs";
import { SetBlendMode, SetColor, SetOrigin, SetRotation } from "./state.mjs";
import { TextPrimitive } from "./text.mjs";

/**
 * The drawer (pen of the app). This handles creating draw commands
 * and primitives and submits them to the backend.
 */
export class Drawer {
    canvas;
    backend;

    queue;

    constructor(canvas, backendKind) {
        this.canvas = canvas;

        this.backend = getBackendInstance(backendKind, canvas);

        this.queue = [];
    }

    /**
     * Reset the state in the Drawer instance.
     */
    reset() { }

    /**
     * Translate the position of the origin to the
     * given coordinates.
     * @param {number} x - the origin x coordinate
     * @param {number} y - the origin y coordinate
     * @returns {Drawer}
     */
    origin(x, y) {
        this.queue.push(new SetOrigin(x, y));
        return this;
    }

    /**
     * Rotate the canvas globally for all draw commands.
     * @param {number} rotation the rotation
     * @returns {Drawer}
     */
    rotate(rotation) {
        this.backend.globalRotate(rotation);
        return this;
    }

    /**
     * Sets the blend mode operation to use.
     * @param {BlendMode} mode - the blend mode
     */
    blendMode(mode) {
        this.queue.push(new SetBlendMode(mode));
    }

    /**
     * Specify a color with which the background should be cleared.
     * @returns {Background} - the background
     */
    background() {
        let bg = new Background();
        this.queue.push(bg);
        return bg;
    }

    /**
     * Begin drawing a rect.
     * @returns {RectPrimitive} - the rectangle
     */
    rect() {
        let prim = new RectPrimitive();
        this.queue.push(prim);
        return prim;
    }

    /**
     * Begin drawing a line.
     * @returns {LinePrimitive} - the line
     */
    line() {
        let prim = new LinePrimitive();
        this.queue.push(prim);
        return prim;
    }

    /**
     * Begin drawing an arc.
     * @returns {ArcPrimitive} - the arc.
     */
    arc() {
        let prim = new ArcPrimitive();
        this.queue.push(prim);
        return prim;
    }

    /**
     * Begin drawing a circle.
     * Shorthand for app.pen().arc().circle()
     * @returns {ArcPrimitive} the circle
     */
    circle() {
        let c = new ArcPrimitive().circle();
        this.queue.push(c);
        return c;
    }

    /**
     * Begin drawing text.
     * @returns {TextPrimitive}
     */
    text() {
        let prim = new TextPrimitive();
        this.queue.push(prim);
        return prim;
    }

    /**
     * Begin drawing a point.
     * @returns {PointPrimitive}
     */
    point() {
        let prim = new PointPrimitive();
        this.queue.push(prim);
        return prim;
    }

    /**
     * Begin drawing a polygon.
     * @returns {PolygonPrimitive}
     */
    poly() {
        let prim = new PolygonPrimitive();
        this.queue.push(prim);
        return prim;
    }

    /**
     * Modify the pixel buffer in a function.
     * @param {*} bufferModifyFn the pixel buffer modify function
     * @returns {ModifyPixelBuffer}
     */
    pixelbuffer(bufferModifyFn) {
        let cmd = new ModifyPixelBuffer(bufferModifyFn);
        this.queue.push(cmd);
        return cmd;
    }

    /**
     * Begin drawing a bezier curve.
     * @returns {BezierPrimitive}
     */
    bezier() {
        let b = new BezierPrimitive();
        this.queue.push(b);
        return b;
    }

    finish() {
        const processCmd = (cmd) => {

            if (cmd instanceof SetOrigin) {
                this.backend.setOrigin(cmd);
            } else if (cmd instanceof SetColor) {
                this.backend.setColor(cmd);
            } else if (cmd instanceof SetBlendMode) {
                this.backend.setBlendMode(cmd);
            } else if (cmd instanceof Background) {
                this.backend.clearBackground(cmd);
            } else if (cmd instanceof RectPrimitive) {
                this.backend.drawRect(cmd);
            } else if (cmd instanceof LinePrimitive) {
                this.backend.drawLine(cmd);
            } else if (cmd instanceof ArcPrimitive) {
                this.backend.drawArc(cmd);
            } else if (cmd instanceof TextPrimitive) {
                this.backend.drawText(cmd);
            } else if (cmd instanceof PointPrimitive) {
                this.backend.drawPoint(cmd);
            } else if (cmd instanceof PolygonPrimitive) {
                this.backend.drawPolygon(cmd);
            } else if (cmd instanceof ModifyPixelBuffer) {
                this.backend.modifyPixelBuffer(cmd);
            } else if (cmd instanceof SetRotation) {
                this.backend.setRotation(cmd);
            } else if (cmd instanceof BezierPrimitive) {
                this.backend.drawBezier(cmd);
            }
        };

        this.queue.flatMap(cmd => cmd.genCmdList()).forEach(cmd => {
            if(!cmd.dontSaveCtx) this.backend.beginCmd();
            processCmd(cmd);
            if(!cmd.dontSaveCtx) this.backend.endCmd();
        });

        this.queue.length = 0;
    }

    /**
     * Finish the frame and submit all the
     * draw commands to the backend which
     * handles all the drawing to the canvas
     * or plotting to paper.
     */
    plot() {
        this.finish();
    }
}