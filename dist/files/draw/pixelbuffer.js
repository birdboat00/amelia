import { DrawCommand } from "./drawcommand.js";
export class ModifyPixelBuffer extends DrawCommand {
    constructor(bufferModifyFn) {
        super();
        this.bufferModifyFn = bufferModifyFn;
    }
    getCmdList() {
        let list = super.getCmdList();
        list.push(this);
        return list;
    }
}
