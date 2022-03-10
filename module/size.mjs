const convertDimToPx = (dimensions, ppi = 96) => {
    return {
        w: convertDistance(dimensions.w, ppi),
        h: convertDistance(dimensions.h, ppi)
    }
};

const convertDistance = (millimeter, ppi = 96) => {
    // mm = ( pixels * 25.4 ) / ppi;
    // px = mm * ppi / 24.5;
    // https://stackoverflow.com/a/16275262
    return Math.round(millimeter * ppi / 24.5);
};

/**
 * The Size type is used to describe the size
 * of something.
 * It has a height and width property which
 * are the sizes in pixels.
 */
export class Size {
    #w;
    #h;

    /**
     * Create a size with pixel dimensions.
     * Same as calling fromPx.
     * @param {number} width - the width in pixels.
     * @param {number} height - the height in pixels.
     */
    constructor(width, height) {
        this.#w = width;
        this.#h = height;
    }

    /**
     * Create a size with pixel dimensions.
     * Same as calling the constructor.
     * @param {number} width - the width in pixels
     * @param {number} height - the height in pixel
     * @returns {Size}
     */
    static fromPx(width, height) {
        return new Size(width, height);
    }

    /**
     * Create a size with millimeter dimensions.
     * Uses the default CSS spec 96 pixels-per-inch.
     * @param {number} width - the width in millimeters
     * @param {number} height - the height in millimeters
     * @returns {Size}
     */
    static fromMillimeters(width, height) {
        const dim = convertDimToPx({
            w: width,
            h: height
        });
        return new Size(dim.w, dim.h);
    }

    /**
     * Create a new size with inch dimensions.
     * Uses the default CSS spec 96 pixels-per-inch.
     * @param {number} width - the width in inches
     * @param {number} height - the height in inches
     * @returns {Size}
     */
    static fromInches(width, height) {
        return Size.fromMillimeters(
            width * 25.4,
            height * 25.4
        );
    }

    /**
     * The width in pixels.
     */
    get width() {
        return this.#w;
    }

    /**
     * The height in pixels.
     */
    get height() {
        return this.#h;
    }

    /**
     * Turn the size landscape.
     * This makes the shorter dimensions the width and
     * the longer dimensions the height.
     * @returns {Size}
     */
    landscape() {
        const newH = Math.min(this.#h, this.#w);
        const newW = Math.max(this.#h, this.#w);
        this.#h = newH;
        this.#w = newW;
        return this;
    }

    /**
     * Turn the size portrait.
     * This makes the longer dimension the height and
     * the shorter dimension the width.
     * @returns {Size}
     */
    portrait() {
        const newH = Math.max(this.#h, this.#w);
        const newW = Math.min(this.#h, this.#w);
        this.#h = newH;
        this.#w = newW;
        return this;
    }

    /**
     * North american postcard paper size.
     * 101.6x152.4mm
     */
    static get paperPostcard() { return Size.fromMillimeters(101.6, 152.4); }
    /**
     * DIN-A3 paper size.
     * 297x420mm
     */
    static get paperA3() { return Size.fromMillimeters(297, 420); }
    /**
     * DIN-A4 paper size.
     * 210x297mm
     */
    static get paperA4() { return Size.fromMillimeters(210, 297); }
    /**
     * DIN-A5 paper size.
     * 148x210mm
     */
    static get paperA5() { return Size.fromMillimeters(148, 210); }
    /**
     * DIN-A6 paper size.
     * 105x148mm
     */
    static get paperA6() { return Size.fromMillimeters(105, 148); }
    /**
     * DIN-A7 paper size.
     * 74x105mm
     */
    static get paperA7() { return Size.fromMillimeters(74, 105); }

    /**
     * North american letter size.
     * 8.5x11in
     */
    static get paperLetter() { return Size.fromInches(8.5, 11); }
    /**
     * North american half letter size.
     * 5.5x8.5in
     */
    static get paperHalfLetter() { return Size.fromInches(5.5, 8.5); }
    /**
     * Carre L - quadratic A4 paper size.
     * 210x210mm
     */
    static get paperCarreL() { return Size.fromMillimeters(210, 210); }
}