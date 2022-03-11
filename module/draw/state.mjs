import { DrawCommand } from "./drawcommand.mjs";

/**
 * Draw command to set the origin of the primitive.
 */
export class SetOrigin extends DrawCommand {
    x;
    y;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
}

/**
 * Draw command to set the fill and stroke color.
 */
export class SetColor extends DrawCommand {
    strokeColor;
    fillColor;

    constructor(color, strokeColor) {
        super();
        this.strokeColor = strokeColor || color;
        this.fillColor = color;
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
        super();
        this.mode = mode;
    }
}