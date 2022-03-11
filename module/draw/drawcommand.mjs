export class DrawCommand {
    preCommands;

    constructor() {
        this.preCommands = [];
    }

    pushPreCmd(cmd) {
        this.preCommands.push(cmd);
    }

    popPreCmd() {
        return this.preCommands.pop();
    }
}