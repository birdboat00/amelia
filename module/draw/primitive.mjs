import { DrawCommand } from "./drawcommand.mjs";
import { SetColor, SetRotation } from "./state.mjs";
import { Color } from "../color.mjs";

export class Primitive extends DrawCommand {
    pos;
    weight;
    rotation;
    fillCol;
    strokeCol;

    constructor() {
        super();
        this.pos = { x: 0, y: 0 };
        this.strokeCol = Color.Black;
        this.fillCol = Color.Black;
        this.weight = 1;
        this.rotation = 0;
    }

    /**
     * Set the color of the primitive.
     * @param {Color} fillColor - the color to use
     * @param {Color} strokeColor - the stroke color to use, may be null then it uses the fill color.
     * @returns {Primitive} - the primitive
     */
    color(fillColor, strokeColor) {
        this.fillCol = fillColor;
        this.strokeCol = strokeColor;
        return this;
    }

    /**
     * Set the X coordinate of the primitive.
     * @param {number} - the x coordinate
     * @returns {Primitive} - the primitive
     */
    x(x) {
        this.pos.x = x;
        return this;
    }

    /**
     * Set the Y coordinate of the primitive.
     * @param {number} y - the y coordinate
     * @returns {Primitive} - the primitive
     */
    y(y) {
        this.pos.y = y;
        return this;
    }

    /**
     * Set the X and Y coordinates of the primitive.
     * @param {number} x - the x coordinate
     * @param {number} y - the y coordinate
     * @returns {Primitive} - the primitive
     */
    xy(x, y) {
        this.x(x);
        this.y(y);
        return this;
    }

    /**
     * Specify the rotation of the primitive. It gets rotated
     * around the point of the position.
     * @param {number} rotation - the rotation in radians
     * @returns {Primitive}
     */
    rotation(rotation) {
        this.rotation = rotation;
        return this;
    }

    /**
     * Set the stroke weight (aka width) of the
     * stroke lines.
     * @param {number} weight - the stroke weight
     * @returns {Primitive} - the primitive
     */
    strokeWeight(weight) {
        this.weight = weight;
        return this;
    }

    /**
     * --- INTERNAL ---
     * Generate the command list for the primitive
     * @returns {Array}
     */
    genCmdList() {
        return [
            new SetColor(this.fillCol, this.strokeCol),
            new SetRotation(this.rotation, this.pos.x, this.pos.y)
        ];
    }
}