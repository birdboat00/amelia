import { Primitive } from "./primitive.mjs";

/**
 * Primitive that defines a cubic bezier curve.
 */
export class BezierPrimitive extends Primitive {
    cp1x;
    cp1y;
    cp2x;
    cp2y;
    ap2x;
    ap2y;

    constructor() {
        super();
    }

    /**
     * Specify the control points
     * @param {number} cp1x first control point x coord
     * @param {number} cp1y first control point y coord
     * @param {number} cp2x second control point x coord
     * @param {number} cp2y second control point y coord
     * @returns {BezierPrimitive}
     */
    controlpts(cp1x, cp1y, cp2x, cp2y) {
        this.cp1x = cp1x;
        this.cp1y = cp1y;
        this.cp2x = cp2x;
        this.cp2y = cp2y;
        return this;
    }

    /**
     * Specify the anchor points.
     * The position is always equal to the first anchor point.
     * @param {number} ap1x first anchor point x coord
     * @param {number} ap1y first anchor point y coord
     * @param {number} ap2x second anchor point x coord
     * @param {number} ap2y second anchor point y coord
     * @returns {BezierPrimitive}
     */
    anchorpts(ap1x, ap1y, ap2x, ap2y) {
        this.xy(ap1x, ap1y);
        this.ap2x = ap2x;
        this.ap2y = ap2y;
        return this;
    }

    /**
     * Specify the first anchor point.
     * @param {number} x first anchor point x coord
     * @param {number} y first anchor point y coord
     * @returns {BezierPrimitive}
     */
    start(x, y) {
        this.xy(x, y);
        return this;
    }

    /**
     * Specify the second anchor point
     * @param {number} x second anchor point x coord
     * @param {number} y second anchor point y coord
     * @returns {BezierPrimitive}
     */
    end(x, y) {
        this.ap2x = x;
        this.ap2y = y;
        return this;
    }

    genCmdList() {
        let list = super.genCmdList();
        list.push(this);
        return list;
    }
}