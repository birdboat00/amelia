import { Primitive } from "./primitive.mjs";

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
