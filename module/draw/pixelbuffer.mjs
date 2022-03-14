import { DrawCommand } from "./drawcommand.mjs";

/**
 * Draw command to modify the pixel buffer of the canvas directly.
 */
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