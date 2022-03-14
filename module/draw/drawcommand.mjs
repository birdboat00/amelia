export class DrawCommand {
    constructor(dontSaveCtx = false) {
        this.dontSaveCtx = dontSaveCtx;
    }

    genCmdList() {
        return [];
    }
}