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

    genCmdList() {
        let list = super.genCmdList();
        list.push(this);
        return list;
    }
}