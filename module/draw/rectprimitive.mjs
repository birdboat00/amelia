import { Primitive } from "./primitive.mjs";
import { Size } from "../size.mjs";

export class RectPrimitive extends Primitive {

    sz;

    constructor(queue) {
        super(queue);
        this.sz = Size.fromPx(0, 0);
    }

    size(size) {
        this.sz = size;
        return this;
    }

    /**
     * Sets the width and height of the rectangle.
     * @param {number} w - the width
     * @param {number} h - the height
     * @returns {RectPrimitive} - itself
     */
    wh(w, h) {
        this.sz.width = w;
        this.sz.height = h;
        return this;
    }

    /**
     * Sets the width of the rectangle.
     * @param {number} w - the width
     * @returns {RectPrimitive} - itself
     */
    w(w) {
        this.sz.width = w;
        return this;
    }

    /**
     * Sets the height of the rectangle.
     * @param {number} h - the height
     * @returns {RectPrimitive}
     */
    h(h) {
        this.sz.height = h;
        return this;
    }
}