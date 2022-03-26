import { Vec2 } from "../vec2.mjs";
import { Primitive } from "./primitive.mjs";

/**
 * A primitive that draws a quadratic curve
 */
export class QuadraticCurve extends Primitive {

    cpx;
    cpy;
    endx;
    endy;

    constructor() {
        super();
        this.cpx = 0;
        this.cpy = 0;
        this.endx = 0;
        this.endy = 0;
    }

    /**
     * Specify the curve control point.
     * @param {number} x control point x coord
     * @param {number} y control point y coord
     * @returns {QuadraticCurve}
     */
    controlpt(x, y) {
        this.cpx = x;
        this.cpy = y;
        return this;
    }

    /**
     * Specify the start and end anchor points.
     * The x and y position of the primitive is always
     * equal to the start anchor point.
     * @param {number} startX start point x coord
     * @param {number} startY start point y coord
     * @param {number} endX end point x coord
     * @param {number} endY end point y coord
     * @returns {QuadraticCurve}
     */
    anchorpts(startX, startY, endX, endY) {
        this.xy(startX, startY);
        this.endx = endX;
        this.endy = endY;
        return this;
    }

    /**
     * Get point in curve at time
     * @param {number} t time in the curve
     * @returns {number}
     */
    getpt(t) {
        const x = Math.pow((1 - t), 2) * this.pos.x + 2 * t * (1 - t) * this.cpx + Math.pow(t, 2) * this.endx;
        const y = Math.pow((1 - t), 2) * this.pos.y + 2 * t * (1 - t) * this.cpy + Math.pow(t, 2) * this.endy;
        return new Vec2(x, y);
    }

    getderiv(t) {
        const d1 = new Vec2(
            2 * (this.cpx - this.pos.x),
            2 * (this.cpy - this.pos.y)
        );
        const d2 = new Vec2(
            2 * (this.endx - this.cpx),
            2 * (this.endy - this.cpy)
        );
        const x = (1 - t) * d1.x + t * d2.x;
        const y = (1 - t) * d1.y + t * d2.y;
        return new Vec2(x, y);
    }

    /**
     * Get normal in curve at time.
     * @param {number} t time in the curve
     * @returns {number}
     */
    getnml(t) {
        const d = this.getderiv(t);
        const q = Math.sqrt(d.x * d.x + d.y * d.y);
        const x = -d.y / q;
        const y = d.x / q;
        return new Vec2(x, y);
    }

    genCmdList() {
        let list = super.genCmdList();
        list.push(this);
        return list;
    }
}