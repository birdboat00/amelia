import { DrawCommand } from "./drawcommand.mjs";

export class ModifyPixelBuffer extends DrawCommand {

    bufferModifyFn;

    constructor(bufferModifyFn) {
        super();

        this.bufferModifyFn = bufferModifyFn;
    }

    genCmdList() {
        let list = super.genCmdList();
        list.push(this);
        return list;
    }
}