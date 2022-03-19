import { Color } from "../color.js";
import { DrawCommand } from "./drawcommand.js";
import { SetColor } from "./state.js";
/**
 * Draw command to clear and render the background.
 */
export class Background extends DrawCommand {
    constructor() {
        super();
        this.clearColor = Color.Transparent;
    }
    /**
     * Clear the background with the given color.
     * @param {Color} color - the color
     * @returns {Background} - itself
     */
    color(color) {
        this.clearColor = color;
        return this;
    }
    /**
     * Makes the background clear transparent.
     * @returns {Background}
     */
    transparent() {
        this.clearColor = Color.Transparent;
        return this;
    }
    getCmdList() {
        let list = super.getCmdList();
        list.push(new SetColor(this.clearColor, this.clearColor));
        list.push(this);
        return list;
    }
}
