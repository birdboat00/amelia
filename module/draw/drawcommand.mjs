/**
 * Type to create a draw command. This is what all draw commands
 * have to inherit from.
 */
export class DrawCommand {
    constructor(dontSaveCtx = false) {
        this.dontSaveCtx = dontSaveCtx;
    }

    genCmdList() {
        return [];
    }
}