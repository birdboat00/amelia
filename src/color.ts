import { clamp, randomRangeInt } from "./util.js";

/**
 * Utility class for manipulating RGBA colors.
 *
 * Color is a simple color class composed of 4 components:
 * - Red
 * - Green
 * - Blue
 * - Alpha (opacity)
 *
 * Each component is a public member, an integer in the range 0 to 255
 */
export class Color {
    /** The red value of the color */
    r: number;
    /** The green value of the color */
    g: number;
    /** The blue value of the color */
    b: number;
    /** The alpha value of the color */
    a: number;

    /**
     * Create a new color from R, G, B and A components
     * in the range of 0 to 255.
     * @param {number} r red value
     * @param {number} g green value
     * @param {number} b blue value
     * @param {number} a alpha (opacity) value
     */
    constructor(r: number, g: number, b: number, a: number = 255) {
        this.r = clamp(r, 0, 255);
        this.g = clamp(g, 0, 255);
        this.b = clamp(b, 0, 255);
        this.a = clamp(a, 0, 255);
    }

    /**
     * Creates a color from floats. Expects the floats
     * to be in the range from 0.0 to 1.0.
     * @param {number} r - red value
     * @param {number} g - green value
     * @param {number} b - blue value
     * @param {number} a - alpha value
     * @returns {Color} - the color
     */
    static fromFloats(r: number, g: number, b: number, a: number): Color {
        let red = (r || 0) * 255;
        let green = (g || 0) * 255;
        let blue = (b || 0) * 255;
        let alpha = (a || 1) * 255;
        return new Color(
            Math.round(red),
            Math.round(green),
            Math.round(blue),
            Math.round(alpha));
    }

    /**
     * Create a color from floats. Expects the floats
     * to be in the range of 0.0 to 1.0.
     * @param {number} r - the red value
     * @param {number} g - the green value
     * @param {number} b - the blue value
     * @param {number} a - the alpha value
     * @returns {Color}
     */
    static fromRgba(r: number, g: number, b: number, a: number): Color {
        return Color.fromFloats(r, g, b, a);
    }

    /**
     * Creates a color from integers. Expectes the
     * integers to be in the range from 0 to 255.
     * @param {number} r - red value
     * @param {number} g - green value
     * @param {number} b - blue value
     * @param {number} a - alpha value
     * @returns {Color} - the color
     */
    static fromBytes(r: number, g: number, b: number, a: number): Color {
        return new Color(r || 0, g || 0, b || 0, a || 255);
    }

    /**
     * Creates a color from integers. Expects the
     * integers to be in the range of 0 to 255.
     * @param {number} r - the red value
     * @param {number} g - the green value
     * @param {number} b - the blue value
     * @param {number} a - the alpha value
     * @returns {Color}
     */
    static fromRgba8(r: number, g: number, b: number, a: number): Color {
        return Color.fromBytes(r, g, b, a);
    }

    /**
     * Creates a color from a hex value
     * @param {number} hex - the hex color value in the format 0xrrggbbaa
     * @returns {Color} - the color
     */
    static fromHex(hex: number): Color {
        let r = (hex >> 24) & 0xff;
        let g = (hex >> 16) & 0xff;
        let b = (hex >> 8) & 0xff;
        let a = hex & 0xff;

        return new Color(r, g, b, a);
    }

    /**
     * Creates a color from a hex string value.
     * @param {string} hexStr - the hex color string in the format 0xrrggbbaa
     * @returns {Color}
     */
    static fromHexStr(hexStr: string): Color {
        return Color.fromHex(parseInt(hexStr, 16));
    }

    /**
     * Creates a color from an HSL color value.
     * Assumes h, s and l are in the range of 0 to 1
     * @param {number} h - hue
     * @param {number} s - saturation
     * @param {number} l - luminance
     * @returns {Color} - the color
     */
    static fromHsl(h: number, s: number, l: number): Color {
        let r, g, b;

        if (s == 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return Color.fromFloats(r, g, b, 1.0);
    }

    /**
     * Creates a color from an HSL color value.
     * Assumes h, s and l are in the range of 0 to 359 and 0 to 100.
     * @param {number} h - hue
     * @param {number} s - saturation
     * @param {number} l - luminance
     * @returns {Color}
     */
    static fromHsl8(h: number, s: number, l: number): Color {
        return Color.fromHsl(h / 359, s / 100, l / 100);
    }

    static fromHsb8(h: number, s: number, b: number): Color {
        let l = (2 - s) * b / 2;
        if (l != 0) {
            if (l == 0) {
                s = 0;
            } else if (l < 0.5) {
                s = s * b / (l * 2);
            } else {
                s = s * b / (2 - l * 2);
            }
        }

        return Color.fromHsl(h / 359, s / 100, l / 100);
    }

    /**
     * Generate a random color
     * @returns {Color} the random color value.
     */
    static random(): Color {
        const r = randomRangeInt(0, 255);
        const g = randomRangeInt(0, 255);
        const b = randomRangeInt(0, 255);

        return new Color(r, g, b);
    }

    /**
     * Returns the color as a CSS color string.
     * @returns {string} - the css rgba() color string
     */
    asCss(): string {
        return `rgb(${this.r},${this.g},${this.b},${this.a})`;
    }

    /**
     * Returns the color as a CSS color string.
     * @returns {string} - the css rgba() color string
     */
    get css(): string {
        return this.asCss();
    }

    /**
     * Returns the color components as an array.
     * @returns {Array} the array of the color components.
     */
    get array(): Array<any> {
        return [this.r, this.g, this.b, this.a];
    }

    /** */
    static get Black() { return new Color(0, 0, 0); }
    /** */
    static get White() { return new Color(255, 255, 255); }
    /** */
    static get Red() { return new Color(255, 0, 0); }
    /** */
    static get Green() { return new Color(0, 255, 0); }
    /** */
    static get Blue() { return new Color(0, 0, 255); }
    /** */
    static get Yellow() { return new Color(255, 255, 0); }
    /** */
    static get Magenta() { return new Color(255, 0, 255); }
    /** */
    static get Cyan() { return new Color(0, 255, 255); }
    /** */
    static get Transparent() { return new Color(0, 0, 0, 0); }

    /** */
    static get PastellRed() { return new Color(172, 51, 53); }
    /** */
    static get GrassGreen() { return new Color(96, 117, 76); }
    /** */
    static get MetallicGold() { return new Color(211, 175, 55); }
    /** */
    static get Pink() { return new Color(255, 192, 203); }
    /** */
    static get PinkPantone() { return new Color(215, 72, 148); }
    /** */
    static get Plum() { return new Color(142, 69, 133); }
    /** */
    static get DarkViolet() { return new Color(112, 41, 99); }
    /** */
    static get OrchidViolet() { return new Color(122, 55, 139); }
    /** */
    static get Burgundy() { return new Color(159, 29, 53); }
    /** */
    static get LightBlue() { return new Color(153, 170, 255); }
    /** */
    static get PastellViolet() { return new Color(170, 102, 170); }
    /** */
    static get PastellYellow() { return new Color(230, 192, 115); }
    /** */
    static get Orange() { return new Color(255, 143, 0); }
    /** */
    static get PastellLightViolet() { return new Color(245, 206, 239); }
    /** */
    static get PastellGreen() { return new Color(154, 188, 167); }
    /** */
    static get LightGray() { return new Color(240, 240, 240); }
    /** */
    static get CardboardBrown() { return new Color(183, 168, 150); }
    /** */
    static get DarkBlue() { return new Color(28, 37, 77); }

    /** */
    static get Amaranth() { return new Color(229, 43, 80); }
    /** */
    static get Amber() { return new Color(255, 191, 0); }
    /** */
    static get Amethyst() { return new Color(153, 102, 204); }
    /** */
    static get BabyBlue() { return new Color(137, 207, 240); }
    /** */
    static get BananaYellow() { return new Color(255, 225, 53); }
    /** */
    static get BitterLemon() { return new Color(202, 224, 13); }
    /** */
    static get BitterLime() { return new Color(191, 255, 0); }
    /** */
    static get Bittersweet() { return new Color(254, 111, 94); }
    /** */
    static get BlackCoffee() { return new Color(59, 47, 47); }
    /** */
    static get Camouflage() { return new Color(120, 134, 107); }
    /** */
    static get Carmine() { return new Color(150, 0, 24); }
    /** */
    static get Champagne() { return new Color(247, 231, 206); }
    /** */
    static get Charcoal() { return new Color(54, 69, 79); }
    /** */
    static get CherryBlossom() { return new Color(255, 183, 197); }
    /** */
    static get ChromeYellow() { return new Color(255, 167, 0); }
    /** */
    static get Cobalt() { return new Color(0, 71, 171); }
    /** */
    static get Copper() { return new Color(184, 115, 51); }
    /** */
    static get Coral() { return new Color(255, 127, 80); }
    /** */
    static get Cornflower() { return new Color(100, 149, 237); }
    /** */
    static get Crimson() { return new Color(220, 20, 60); }
    /** */
    static get Dandelion() { return new Color(240, 225, 48); }
    /** */
    static get Eggplant() { return new Color(97, 64, 81); }
    /** */
    static get Emerald() { return new Color(80, 200, 120); }
    /** */
    static get FrenchRose() { return new Color(246, 74, 138); }
    /** */
    static get FuchsiaRose() { return new Color(199, 67, 117); }
    /** */
    static get Fuchsia() { return new Color(204, 57, 123); }
    /** */
    static get Mango() { return new Color(253, 190, 2); }
    /** */
    static get Mint() { return new Color(62, 180, 137); }

    /** */
    static get OldPaper() { return new Color(255, 255, 248); }
}