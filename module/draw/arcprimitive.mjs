import { Primitive } from "./primitive.mjs";

/**
 * Primitive to render an arc.
 */
export class ArcPrimitive extends Primitive {
    rad;
    startAngle;
    endAngle;

    constructor() {
        super();
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
     * Create a full 360 degree arc (aka circle).
     * @returns {ArcPrimitive}
     */
    circle() {
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
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

    /**
     * Specify the diameter of the arc.
     * @param {number} diameter the diamter
     * @returns {ArcPrimitive}
     */
    diameter(diameter) {
        this.rad = diameter / 2;
        return this;
    }

    genCmdList() {
        let list = super.genCmdList();
        list.push(this);
        return list;
    }
}