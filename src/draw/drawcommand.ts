export class DrawCommand {
    dontSaveCtx: boolean;

    constructor(dontSaveCtx: boolean = false) {
        this.dontSaveCtx = dontSaveCtx;
    }
    getCmdList(): DrawCommand[] {
        return [];
    }
}