import { Primitive } from "./primitive.js";
/**
 * Primitive to draw a point.
 */
export class PointPrimitive extends Primitive {
    constructor() {
        super();
    }
    getCmdList() {
        let list = super.getCmdList();
        list.push(this);
        return list;
    }
}
