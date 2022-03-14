import { DrawCommand } from "./drawcommand.mjs";

export class SetRotation extends DrawCommand {
    rot;
    aroundX;
    aroundY;

    constructor(rot, aroundX, aroundY) {
        super();
        this.rot = rot;
        this.aroundX = aroundX;
        this.aroundY = aroundY;
    }

    genCmdList() {
        let list = super.genCmdList();
        list.push(this);
        return list;
    }
}

/**
 * Draw command to set the origin of the primitive.
 */
export class SetOrigin extends DrawCommand {
    x;
    y;

    constructor(x, y) {
        super(true);
        this.x = x;
        this.y = y;
    }

    genCmdList() {
        let list = super.genCmdList();
        list.push(this);
        return list;
    }
}

/**
 * Draw command to set the fill and stroke color.
 */
export class SetColor extends DrawCommand {
    strokeColor;
    fillColor;

    constructor(color, strokeColor) {
        super(true);
        this.strokeColor = strokeColor || color;
        this.fillColor = color;
    }

    genCmdList() {
        let list = super.genCmdList();
        list.push(this);
        return list;
    }
}

/**
 * Blend modes.
 */
export const BlendMode = {
    SourceOver: "source-over",
    Multiply: "multiply",
    Xor: "xor"
}

/**
 * Draw command to set the renderer blend mode.
 */
export class SetBlendMode extends DrawCommand {
    mode;

    constructor(mode) {
        super(true);
        this.mode = mode;
    }

    genCmdList() {
        let list = super.genCmdList();
        list.push(this);
        return list;
    }
}