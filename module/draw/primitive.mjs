import { DrawCommand } from "./drawcommand.mjs";
import { SetColor, SetRotation } from "./state.mjs";
import { Color } from "../color.mjs";
import { Vec2 } from "../vec2.mjs";

/**
 * Base class of all primitives.
 * Handles position, rotation, color and stroke weight.
 * Creates the command list for those properties.
 */
export class Primitive extends DrawCommand {
    pos;
    weight;
    rotation;
    style;
    fillColor;
    strokeColor;
    noFill;
    noStroke;

    constructor() {
        super();
        this.pos = new Vec2();
        this.strokeColor = Color.Black;
        this.fillColor = Color.Black;
        this.weight = 1;
        this.rotation = 0;
        this.noFill = false;
        this.noStroke = false;
    }

    /**
     * Set the color of the primitive.
     * @param {Color} fillColor - the color to use
     * @param {Color} strokeColor - the stroke color to use, may be null then it uses the fill color.
     * @returns {Primitive} - the primitive
     */
    color(fillColor, strokeColor) {
        this.fillColor = fillColor;
        this.strokeColor = strokeColor || fillColor;
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
     * Specify if the primitive shape should be filled with the
     * fill color.
     * @param {boolean} fill should fill the shape
     * @returns {Primitive}
     */
    dofill(fill = true) {
        this.noFill = !fill;
        return this;
    }

    /**
     * Don't fill the shape.
     * Shorthand for dofill(false)
     * @returns {Primitive}
     */
    nofill() {
        this.noFill = true;
        return this;
    }

    /**
     * Fill the shape.
     * Shorthand for dofill(true)
     * @returns {Primitive}
     */
    fill() {
        this.noFill = false;
        return this;
    }

    /**
     * Specify if the primitive shape should be stroked with the
     * stroke color.
     * @param {boolean} stroke should stroke the shape
     * @returns {Primitive}
     */
    dostroke(stroke = true) {
        this.noStroke = !stroke;
        return this;
    }

    /**
     * Don't stroke the shape.
     * Shorthand for dostroke(false)
     * @returns {Primitive}
     */
    nostroke() {
        this.noStroke = true;
        return this;
    }

    /**
     * Stroke the shape.
     * Shorthand for dostroke(true)
     * @returns {Primitive}
     */
    stroke() {
        this.noStroke = false;
        return this;
    }

    /**
     * --- INTERNAL ---
     * Generate the command list for the primitive
     * @returns {Array}
     */
    genCmdList() {
        let list = super.genCmdList();
        if(!(this.noStroke && this.noFill)) {
            list.push(new SetColor(this.fillColor, this.strokeColor));
        }
        list.push(new SetRotation(this.rotation, this.pos.x, this.pos.y));
        return list;
    }
}