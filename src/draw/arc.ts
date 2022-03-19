import { Primitive } from "./primitive.js";

/**
 * Primitive to render an arc.
 */
export class ArcPrimitive extends Primitive {
    rad: number;
    startAngle: number;
    endAngle: number;

    constructor() {
        super();
        this.rad = 0;
        this.startAngle = 0;
        this.endAngle = 0;
    }

    /**
     * Specify the start angle in radians.
     * @param {number} angle - the angle in radians
     * @returns {ArcPrimitive} - itself
     */
    start(angle: number): this {
        this.startAngle = angle;
        return this;
    }

    /**
     * Specify the end angle in radians.
     * @param {number} angle - the angle in radians
     * @returns {ArcPrimitive}
     */
    end(angle: number): this {
        this.endAngle = angle;
        return this;
    }

    /**
     * Specify the radius of the arc.
     * @param {number} rad - the radius
     * @returns {ArcPrimitive}
     */
    radius(rad: number): this {
        this.rad = rad;
        return this;
    }

    getCmdList() {
        let list = super.getCmdList();
        list.push(this);
        return list;
    }
}