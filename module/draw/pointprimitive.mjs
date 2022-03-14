import { Primitive } from "./primitive.mjs";

/**
 * Primitive to draw a point.
 */
export class PointPrimitive extends Primitive {
    constructor() {
        super();
    }

    genCmdList() {
        let list = super.genCmdList();
        list.push(this);
        return list;
    }
}
