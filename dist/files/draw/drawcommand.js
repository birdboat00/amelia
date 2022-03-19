export class DrawCommand {
    constructor(dontSaveCtx = false) {
        this.dontSaveCtx = dontSaveCtx;
    }
    getCmdList() {
        return [];
    }
}
