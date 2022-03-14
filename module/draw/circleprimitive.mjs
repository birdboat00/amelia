import { Primitive } from "./primitive.mjs";

/**
 * Primitive to render a circle.
 */
export class CirclePrimitive extends Primitive {
    _radius;

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

    genCmdList() {
        let list = super.genCmdList();
        list.push(this);
        return list;
    }
}