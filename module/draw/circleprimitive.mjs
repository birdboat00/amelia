import { Primitive } from "./primitive.mjs";

export class CirclePrimitive extends Primitive {
    _radius;

    constructor(queue) {
        super(queue);
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
}