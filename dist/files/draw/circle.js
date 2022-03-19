import { Primitive } from "./primitive.js";
/**
 * Primitive to render a circle.
 */
export class CirclePrimitive extends Primitive {
    constructor() {
        super();
        this._radius = 10;
    }
    /**
     * Specify the circle radius.
     * @param {number} r - the radius
     * @returns {CirclePrimitive} - itself
     */
    radius(r) {
        this._radius = r;
        return this;
    }
    /**
     * Specify the diameter of the circle.
     * @param {number} d - the diameter
     * @returns {CirclePrimitive}
     */
    diameter(d) {
        return this.radius(d / 2);
    }
    getCmdList() {
        let list = super.getCmdList();
        list.push(this);
        return list;
    }
}
