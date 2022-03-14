import { DrawCommand } from "./drawcommand.mjs";
import { Color } from "../color.mjs";

/**
 * Draw command to clear and render the background.
 */
export class Background extends DrawCommand {
    col;

    constructor() {
        super();
        this.col = Color.Transparent;
    }

    /**
     * Clear the background with the given color.
     * @param {Color} color - the color
     * @returns {Background} - itself
     */
    color(color) {
        this.col = color;
        return this;
    }

    /**
     * Makes the background clear transparent.
     * @returns {Background}
     */
    transparent() {
        this.col = Color.Transparent;
        return this;
    }

    /**
     * Clear the background with the given color.
     * The alpha value is set to 1.0.
     * @param {number} r - the red value as float
     * @param {number} g - the green value as float
     * @param {number} b - the blue value as float
     * @returns {Background} - itself
     */
    rgb(r, g, b) {
        this.col = Color.fromFloats(r, g, b, 1.0);
        return this;
    }

    /**
     * Clear the background with the given color.
     * @param {number} r - the red value as float
     * @param {number} g - the green value as float
     * @param {number} b - the blue value as float
     * @param {number} a - the alpha value as float
     * @returns {Background} - itself
     */
    rgba(r, g, b, a) {
        this.col = Color.fromFloats(r, g, b, a);
        return this;
    }

    /**
     * Clear the background with the given color.
     * Expects float values in the range of 0 to 1.0.
     * @param {number} h - the hue value as float
     * @param {number} s - the saturation value as float
     * @param {number} l - the luminance value as float
     * @returns {Background} - itself
     */
    hsl(h, s, l) {
        this.col = Color.fromHsl(h, s, l);
        return this;
    }

    genCmdList() {
        let list = super.genCmdList();
        list.push(this);
        return list;
    }
}