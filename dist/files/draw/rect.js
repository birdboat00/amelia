import { Primitive } from "./primitive.js";
import { Size } from "./../size.js";
/**
 * Primitive that creates a rectangle.
 */
export class RectPrimitive extends Primitive {
    constructor() {
        super();
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
    getCmdList() {
        let list = super.getCmdList();
        list.push(this);
        return list;
    }
}
