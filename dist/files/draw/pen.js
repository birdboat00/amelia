import { Canvas2DBackend } from "./backend/canvas2d.js";
import { Background } from "./background.js";
import { SetBlendMode, SetColor } from "./state.js";
import { RectPrimitive } from "./rect.js";
import { ModifyPixelBuffer } from "./pixelbuffer.js";
import { TextPrimitive } from "./text.js";
import { CirclePrimitive } from "./circle.js";
import { ArcPrimitive } from "./arc.js";
import { LinePrimitive } from "./line.js";
import { PointPrimitive } from "./point.js";
import { PolygonPrimitive } from "./poly.js";
export class Pen {
    constructor(canvas) {
        // this.canvas = canvas;
        this.backend = new Canvas2DBackend(canvas);
        this.queue = [];
    }
    blendmode(mode) {
        this.queue.push(new SetBlendMode(mode));
        return this;
    }
    background() {
        const bg = new Background();
        this.queue.push(bg);
        return bg;
    }
    rect() {
        const p = new RectPrimitive();
        this.queue.push(p);
        return p;
    }
    pixels(modifyBufferFn) {
        const pb = new ModifyPixelBuffer(modifyBufferFn);
        this.queue.push(pb);
        return pb;
    }
    plot() {
        this.queue.flatMap(cmd => cmd.getCmdList())
            .forEach(cmd => {
            if (!cmd.dontSaveCtx)
                this.backend.beginCmd();
            if (cmd instanceof SetColor) {
                this.backend.setColor(cmd);
            }
            else if (cmd instanceof Background) {
                this.backend.clearBackground(cmd);
            }
            else if (cmd instanceof RectPrimitive) {
                this.backend.drawRect(cmd);
            }
            else if (cmd instanceof ModifyPixelBuffer) {
                this.backend.modifyPixelBuffer(cmd);
            }
            else if (cmd instanceof TextPrimitive) {
                this.backend.drawText(cmd);
            }
            else if (cmd instanceof CirclePrimitive) {
                this.backend.drawCircle(cmd);
            }
            else if (cmd instanceof ArcPrimitive) {
                this.backend.drawArc(cmd);
            }
            else if (cmd instanceof LinePrimitive) {
                this.backend.drawLine(cmd);
            }
            else if (cmd instanceof PointPrimitive) {
                this.backend.drawPoint(cmd);
            }
            else if (cmd instanceof PolygonPrimitive) {
                this.backend.drawPoly(cmd);
            }
            if (!cmd.dontSaveCtx)
                this.backend.endCmd();
        });
        this.queue.length = 0;
    }
}
