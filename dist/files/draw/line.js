import { Primitive } from "./primitive.js";
/**
 * Primitive to create a line.
 */
export class LinePrimitive extends Primitive {
    constructor() {
        super();
        this.endpointX = 0;
        this.endpointY = 0;
    }
    /**
     * The start point of the line, shorthand for xy()
     * @param {number} x - the x coordiante
     * @param {number} y - the y coordiante
     * @returns {LinePrimitive} - itself
     */
    start(x, y) {
        this.xy(x, y);
        return this;
    }
    /**
     * Sets the endpoint of the line.
     * @param {number} x - the x coordinate
     * @param {number} y - the y coordinate
     * @returns {LinePrimitive} - itself
     */
    end(x, y) {
        this.endpointX = x;
        this.endpointY = y;
        return this;
    }
    /**
     * Specify the start and end points of the line.
     * @param {number} xs - start point x coordinate
     * @param {number} ys - start point y coordinate
     * @param {number} xe - end point x coordinate
     * @param {number} ye - end point y coordinate
     * @returns {LinePrimitive}
     */
    points(xs, ys, xe, ye) {
        this.start(xs, ys);
        this.end(xe, ye);
        return this;
    }
    getCmdList() {
        let list = super.getCmdList();
        list.push(this);
        return list;
    }
}
