import { Primitive } from "./primitive.mjs";

export class ArcPrimitive extends Primitive {
    rad;
    startAngle;
    endAngle;

    constructor(queue) {
        super(queue);
    }

    /**
     * Specify the start angle in radians.
     * @param {number} angle - the angle in radians
     * @returns {ArcPrimitive} - itself
     */
    start(angle) {
        this.startAngle = angle;
        return this;
    }

    /**
     * Specify the end angle in radians.
     * @param {number} angle - the angle in radians
     * @returns {ArcPrimitive}
     */
    end(angle) {
        this.endAngle = angle;
        return this;
    }

    /**
     * Specify the radius of the arc.
     * @param {number} rad - the radius
     * @returns {ArcPrimitive}
     */
    radius(rad) {
        this.rad = rad;
        return this;
    }
}