import { DrawCommand } from "./drawcommand.js";
export class SetColor extends DrawCommand {
    constructor(fillColor, strokeColor) {
        super(true);
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
    }
    getCmdList() {
        let list = super.getCmdList();
        list.push(this);
        return list;
    }
}
export var BlendMode;
(function (BlendMode) {
    BlendMode["SourceOver"] = "source-over";
    BlendMode["Multiply"] = "multiply";
    BlendMode["Xor"] = "xor";
})(BlendMode || (BlendMode = {}));
;
export class SetBlendMode extends DrawCommand {
    constructor(mode) {
        super(true);
        this.mode = mode;
    }
    getCmdList() {
        let list = super.getCmdList();
        list.push(this);
        return list;
    }
}
