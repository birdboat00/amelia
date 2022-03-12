import { getBackendInstance } from "../backend/backends.mjs";
import { ArcPrimitive } from "./arcprimitive.mjs";
import { Background } from "./background.mjs";
import { CirclePrimitive } from "./circleprimitive.mjs";
import { LinePrimitive } from "./lineprimitive.mjs";
import { ModifyPixelBuffer } from "./pixelbuffer.mjs";
import { PointPrimitive } from "./pointprimitive.mjs";
import { PolygonPrimitive } from "./polyprimitive.mjs";
import { QuadPrimitive } from "./quadprimitive.mjs";
import { RectPrimitive } from "./rectprimitive.mjs";
import { SetBlendMode, SetColor, SetOrigin, SetRotation } from "./state.mjs";
import { TextPrimitive } from "./textprimitive.mjs";
import { TrianglePrimitive } from "./triprimitive.mjs";

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
     */
    origin(x, y) {
        this.queue.push(new SetOrigin(x, y));
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
        let bg = new Background(this.queue);
        this.queue.push(bg);
        return bg;
    }

    /**
     * Begin drawing a rect.
     * @returns {RectPrimitive} - the rectangle
     */
    rect() {
        let prim = new RectPrimitive(this.queue);
        this.queue.push(prim);
        return prim;
    }

    /**
     * Begin drawing a line.
     * @returns {LinePrimitive} - the line
     */
    line() {
        let prim = new LinePrimitive(this.queue);
        this.queue.push(prim);
        return prim;
    }

    /**
     * Begin drawing a quad.
     * @returns {QuadPrimitive} - the quad
     */
    quad() {
        let prim = new QuadPrimitive(this.queue);
        this.queue.push(prim);
        return prim;
    }

    /**
     * Begin drawing a circle.
     * @returns {CirclePrimitive} - the circle
     */
    circle() {
        let prim = new CirclePrimitive(this.queue);
        this.queue.push(prim);
        return prim;
    }

    /**
     * Begin drawing an arc.
     * @returns {ArcPrimitive} - the arc.
     */
    arc() {
        let prim = new ArcPrimitive(this.queue);
        this.queue.push(prim);
        return prim;
    }

    /**
     * Begin drawing a triangle.
     * @returns {TrianglePrimitive} - the triangle
     */
    tri() {
        let prim = new TrianglePrimitive(this.queue);
        this.queue.push(prim);
        return prim;
    }

    /**
     * Begin drawing text.
     * @returns {TextPrimitive}
     */
    text() {
        let prim = new TextPrimitive(this.queue);
        this.queue.push(prim);
        return prim;
    }

    /**
     * Begin drawing a point.
     * @returns {PointPrimitive}
     */
    point() {
        let prim = new PointPrimitive(this.queue);
        this.queue.push(prim);
        return prim;
    }

    /**
     * Begin drawing a polygon.
     * @returns {PolygonPrimitive}
     */
    poly() {
        let prim = new PolygonPrimitive(this.queue);
        this.queue.push(prim);
        return prim;
    }

    pixelbuffer(bufferModifyFn) {
        let cmd = new ModifyPixelBuffer(this.queue, bufferModifyFn);
        this.queue.push(cmd);
        return cmd;
    }

    /**
     * Finish the frame and draw it.
     */
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
            } else if (cmd instanceof QuadPrimitive) {
                this.backend.drawQuad(cmd);
            } else if (cmd instanceof CirclePrimitive) {
                this.backend.drawCircle(cmd);
            } else if (cmd instanceof TrianglePrimitive) {
                this.backend.drawTriangle(cmd);
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
            }
        };

        this.queue.forEach(cmd => {
            if(!cmd.dontSaveCtx) this.backend.beginCmd();
            cmd.preCommands.forEach(preCmd => {
                processCmd(preCmd);
            });
            processCmd(cmd);
            if(!cmd.dontSaveCtx) this.backend.endCmd();
        });

        // clears the array
        this.queue.length = 0;
    }

    /**
     * Finish the frame and draw it onto the canvas!
     */
    plot() {
        this.finish();
    }
}