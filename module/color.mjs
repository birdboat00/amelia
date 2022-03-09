import { clamp } from "./util.mjs";

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
    r;
    g;
    b;
    a;

    constructor(r, g, b, a = 255) {
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
    static fromFloats(r, g, b, a) {
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
     * Creates a color from integers. Expectes the
     * integers to be in the range from 0 to 255.
     * @param {number} r - red value
     * @param {number} g - green value
     * @param {number} b - blue value
     * @param {number} a - alpha value
     * @returns {Color} - the color
     */
    static fromBytes(r, g, b, a) {
        return new Color(r || 0, g || 0, b || 0, a || 255);
    }

    /**
     * Creates a color from a hex value
     * @param {number} hex - the hex color value in the format 0xrrggbbaa
     * @returns {Color} - the color
     */
    static fromHex(hex) {
        let r = (hex >> 24) & 0xff;
        let g = (hex >> 16) & 0xff;
        let b = (hex >> 8) & 0xff;
        let a = hex & 0xff;

        return new Color(r, g, b, a);
    }

    /**
     * Creates a color from an HSL color value.
     * Assumes h, s and l are in the range of 0 to 1
     * @param {number} h - hue
     * @param {number} s - saturation
     * @param {number} l - luminance
     * @returns {Color} - the color
     */
    static fromHsl(h, s, l) {
        let r, g, b;

        if (s == 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
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

    static fromHsb8(h, s, b) {
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
     * Returns the color as a CSS color string.
     * @returns {string} - the css rgb() color string
     */
    asCss() {
        return `rgb(${this.r},${this.g},${this.b},${this.a})`;
    }

    static get Black() { return new Color(0, 0, 0); }
    static get White() { return new Color(255, 255, 255); }
    static get Red() { return new Color(255, 0, 0); }
    static get Green() { return new Color(0, 255, 0); }
    static get Blue() { return new Color(0, 0, 255); }
    static get Yellow() { return new Color(255, 255, 0); }
    static get Magenta() { return new Color(255, 0, 255); }
    static get Cyan() { return new Color(0, 255, 255); }
    static get Transparent() { return new Color(0, 0, 0, 0); }
}