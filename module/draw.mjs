import { getBackendInstance } from "./backend/backends.mjs";
import { ArcPrimitive, Background, CirclePrimitive, LinePrimitive, QuadPrimitive, RectPrimitive, SetBlendMode, SetColor, SetOrigin, TextPrimitive, TrianglePrimitive } from "./primitives.mjs";

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
    reset() {}

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

    textWidth(textString) {
        return 0;
    }

    /**
     * Finish the frame and draw it.
     */
    finish() {
        const processCmd = (cmd) => {
            this.backend.beginCmd();
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
            }
            this.backend.endCmd();
        };

        this.queue.forEach(cmd => {
            cmd.preCommands.forEach(preCmd => {
                processCmd(preCmd);
            });
            processCmd(cmd);
        });

        // clears the array
        this.queue.length = 0;
    }
}