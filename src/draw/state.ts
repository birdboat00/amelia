import { Color } from "../color.js";
import { DrawCommand } from "./drawcommand.js";

export class SetColor extends DrawCommand {
    fillColor: Color;
    strokeColor: Color;

    constructor(fillColor: Color, strokeColor: Color) {
        super(true);

        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
    }

    getCmdList(): DrawCommand[] {
        let list = super.getCmdList();
        list.push(this);
        return list;
    }
}

export enum BlendMode {
    SourceOver = "source-over",
    Multiply = "multiply",
    Xor = "xor"
};

export class SetBlendMode extends DrawCommand {
    mode: BlendMode;

    constructor(mode: BlendMode) {
        super(true);
        this.mode = mode;
    }

    getCmdList(): DrawCommand[] {
        let list = super.getCmdList();
        list.push(this);
        return list;
    }
}