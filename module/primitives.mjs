export class DrawCommand {
    preCommands;

    constructor() {
        this.preCommands = [];
    }

    pushPreCmd(cmd) {
        this.preCommands.push(cmd);
    }

    popPreCmd() {
        return this.preCommands.pop();
    }
}

export class SetOrigin extends DrawCommand {
    x;
    y;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
}

export class SetColor extends DrawCommand {
    strokeColor;
    fillColor;

    constructor(color, strokeColor) {
        super();
        this.strokeColor = strokeColor || color;
        this.fillColor = color;
    }
}

export const BlendMode = {
    Multiply: "multiply"
}

export class SetBlendMode extends DrawCommand {
    mode;

    constructor(mode) {
        super();
        this.mode = mode;
    }
}

export class Primitive extends DrawCommand {
    pos;
    weight;
    queue;

    constructor(queue) {
        super();
        this.queue = queue;
        this.pos = { x: 0, y: 0 };
        this.strokeCol = { r: 0, g: 0, b: 0, a: 0 };
        this.fillCol = { r: 0, g: 0, b: 0, a: 0 };
        this.weight = 1;
    }

    /**
     * Set the color of the primitive.
     * @param {Color} fillColor - the color to use
     * @param {Color} strokeColor - the stroke color to use, may be null then it uses the fill color.
     * @returns {Primitive} - the primitive
     */
    color(fillColor, strokeColor) {
        // this.queue.splice(this.queue.length - 1, 0, new SetColor(fillColor, strokeColor));
        this.preCommands.push(new SetColor(fillColor, strokeColor));
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
     * Shorthand for xy()
     * @param {number} x - the x coordinate
     * @param {number} y - the y coordinate
     * @returns {Primitive} - the primitive
     */
    pos(x, y) {
        this.xy(x, y);
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
}

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

export class TrianglePrimitive extends Primitive {
    _a;
    _b;
    _c;

    constructor(queue) {
        super(queue);

        this._a = { x: 0, y: 0 };
        this._b = { x: 0, y: 0 };
        this._c = { x: 0, y: 0 };
    }

    a(x, y) {
        this._a.x = x;
        this._a.y = y;
        return this;
    }

    b(x, y) {
        this._b.x = x;
        this._b.y = y;
        return this;
    }

    c(x, y) {
        this._c.x = x;
        this._c.y = y;
        return this;
    }

    abc(ax, ay, bx, by, cx, cy) {
        this.a(ax, ay);
        this.b(bx, by);
        this.c(cx, cy);
        return this;
    }
}

export class ArcPrimitive extends Primitive {
    rad;
    startAngle;
    endAngle;

    constructor(queue) {
        super(queue);
    }

    /**
     * Specify the start angle in radians.
     * @param {number} angle - the angle in radians
     * @returns {ArcPrimitive} - itself
     */
    start(angle) {
        this.startAngle = angle;
        return this;
    }

    /**
     * Specify the end angle in radians.
     * @param {number} angle - the angle in radians
     * @returns {ArcPrimitive}
     */
    end(angle) {
        this.endAngle = angle;
        return this;
    }

    /**
     * Specify the radius of the arc.
     * @param {number} rad - the radius
     * @returns {ArcPrimitive}
     */
    radius(rad) {
        this.rad = rad;
        return this;
    }
}

export class CirclePrimitive extends Primitive {
    _radius;

    constructor(queue) {
        super(queue);
        this._radius = 10;
    }

    /**
     * Specify the circle radius.
     * @param {number} r - the radius
     * @returns {CirclePrimitive} - itself
     */
    radius(r) {
        this._radius = r;
        return this;
    }
}

export class QuadPrimitive extends Primitive {
    vertices;

    constructor(queue) {
        super(queue);
        this.vertices = [
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 }
        ];
    }

    /**
     * Use the given four points as the corners of the quad.
     * @param {number} ax - p1 x
     * @param {number} ay - p1 y
     * @param {number} bx - p2 x
     * @param {number} by - p2 y
     * @param {number} cx - p3 x
     * @param {number} cy - p3 y
     * @param {number} dx - p4 x
     * @param {number} dy - p4 y
     * @returns {QuadPrimitive} - itself
     */
    points(ax, ay, bx, by, cx, cy, dx, dy) {
        this.pos.x = ax;
        this.pos.y = ay;
        this.vertices[0] = { x: ax, y: ay };
        this.vertices[1] = { x: bx, y: by };
        this.vertices[2] = { x: cx, y: cy };
        this.vertices[3] = { x: dx, y: dy };

        return this;
    }

    /**
     * Set the x coordinate of p1
     * @param {number} x - x coordinate
     * @returns {QuadPrimitive} - itself
     */
    x(x) {
        this.pos.x = x;
        this.vertices[0].x = x;
        return this;
    }

    /**
     * Sets the y coordinate of p1
     * @param {number} y - y coordinate
     * @returns {QuadPrimitive} - itself
     */
    y(y) {
        this.pos.y = y;
        this.vertices[0].y = y;
        return this;
    }
}

export class LinePrimitive extends Primitive {
    endpoint;

    constructor(queue) {
        super(queue);
        this.endpoint = { x: 0, y: 0 };
    }

    /**
     * The start point of the line, shorthand for xy()
     * @param {number} x - the x coordiante
     * @param {number} y - the y coordiante
     * @returns {LinePrimitive} - itself
     */
    start(x, y) {
        this.xy(x, y);
        return this;
    }

    /**
     * Sets the endpoint of the line.
     * @param {number} x - the x coordinate
     * @param {number} y - the y coordinate
     * @returns {LinePrimitive} - itself
     */
    end(x, y) {
        this.endpoint.x = x;
        this.endpoint.y = y;
        return this;
    }

    /**
     * Specify the start and end points of the line.
     * @param {number} xs - start point x coordinate
     * @param {number} ys - start point y coordinate
     * @param {number} xe - end point x coordinate
     * @param {number} ye - end point y coordinate
     * @returns
     */
    points(xs, ys, xe, ye) {
        this.start(xs, ys);
        this.end(xe, ye);
        return this;
    }
}

export class RectPrimitive extends Primitive {

    size;

    constructor(queue) {
        super(queue);
        this.size = { w: 0, h: 0 };
    }

    /**
     * Sets the width and height of the rectangle.
     * @param {number} w - the width
     * @param {number} h - the height
     * @returns {RectPrimitive} - itself
     */
    wh(w, h) {
        this.size.w = w;
        this.size.h = h;
        return this;
    }

    /**
     * Sets the width of the rectangle.
     * @param {number} w - the width
     * @returns {RectPrimitive} - itself
     */
    w(w) {
        this.size.w = w;
        return this;
    }

    /**
     * Sets the height of the rectangle.
     * @param {number} h - the height
     * @returns {RectPrimitive}
     */
    h(h) {
        this.size.h = h;
        return this;
    }
}

export class Background extends DrawCommand {
    col;

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
}