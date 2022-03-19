import { DrawCommand } from "./drawcommand.js";

export type BufferModifyFunction = (pixels: Uint8ClampedArray) => void;

export class ModifyPixelBuffer extends DrawCommand {
    bufferModifyFn: BufferModifyFunction;

    constructor(bufferModifyFn: BufferModifyFunction) {
        super();

        this.bufferModifyFn = bufferModifyFn;
    }

    getCmdList(): DrawCommand[] {
        let list = super.getCmdList();
        list.push(this);
        return list;
    }
}