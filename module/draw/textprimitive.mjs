import { Primitive } from "./primitive.mjs";

export class TextPrimitive extends Primitive {
    displayString;
    fontName;
    fontSize;

    constructor(queue) {
        super(queue);

        this.displayString = "";
        this.fontName = "Arial";
        this.fontSize = 12;
    }

    /**
     * Specify the string that the text displays.
     * @param {string} text - the string to display
     * @returns {TextPrimitive}
     */
    text(text) {
        this.displayString = text;
        return this;
    }

    /**
     * Specify the name of the font used for the text.
     * @param {string} fontName - the name of the font to use
     * @returns {TextPrimitive}
     */
    font(fontName) {
        this.fontName = fontName;
        return this;
    }

    /**
     * Specify the font size in pixels.
     * @param {number} fontSize - the font size in pixels
     * @returns {TextPrimitive}
     */
    size(fontSize) {
        this.fontSize = fontSize;
        return this;
    }

    /**
     * Calculates the width of the text in pixels with
     * the currently assigned properties.
     * WARNING: can be slow and probably always is
     * @returns {number} - the width of the text in pixels
     */
    measureWidth() {
        // TODO: this must be very slow oooof
        const canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        ctx.font = `${this.fontSize}px ${this.fontName}`;
        return ctx.measureText(this.displayString).width;
    }
}