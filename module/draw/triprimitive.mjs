import { Primitive } from "./primitive.mjs";

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