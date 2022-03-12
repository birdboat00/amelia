import { DrawCommand } from "./drawcommand.mjs";

export class ModifyPixelBuffer extends DrawCommand {

    bufferModifyFn;

    constructor(queue, bufferModifyFn) {
        super(queue);

        this.bufferModifyFn = bufferModifyFn;
    }
}