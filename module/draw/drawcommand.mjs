export class DrawCommand {
    preCommands;

    constructor(dontSaveCtx = false) {
        this.preCommands = [];
        this.dontSaveCtx = dontSaveCtx;
    }

    pushPreCmd(cmd) {
        this.preCommands.push(cmd);
    }

    popPreCmd() {
        return this.preCommands.pop();
    }
}