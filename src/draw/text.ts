import { Primitive } from "./primitive.js";

/**
 * Primitive to create text.
 */
export class TextPrimitive extends Primitive {
    displayString: string;
    fontName: string;
    fontSize: number;

    constructor() {
        super();

        this.displayString = "";
        this.fontName = "Arial";
        this.fontSize = 12;
    }

    /**
     * Specify the string that the text displays.
     * @param {string} text - the string to display
     * @returns {TextPrimitive}
     */
    text(text: string): this {
        this.displayString = text;
        return this;
    }

    /**
     * Specify the name of the font used for the text.
     * @param {string} fontName - the name of the font to use
     * @returns {TextPrimitive}
     */
    font(fontName: string): this {
        this.fontName = fontName;
        return this;
    }

    /**
     * Specify the font size in pixels.
     * @param {number} fontSize - the font size in pixels
     * @returns {TextPrimitive}
     */
    size(fontSize: number): this {
        this.fontSize = fontSize;
        return this;
    }

    /**
     * Calculates the width of the text in pixels with
     * the currently assigned properties.
     * WARNING: can be slow and probably always is
     * @returns {number} - the width of the text in pixels
     */
    measureWidth(): number {
        // TODO: this must be very slow oooof
        const canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.font = `${this.fontSize}px ${this.fontName}`;
        return ctx.measureText(this.displayString).width;
    }

    getCmdList() {
        let list = super.getCmdList();
        list.push(this);
        return list;
    }
}