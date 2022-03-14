import { PolygonPrimitive } from "./polyprimitive.mjs";
import { Primitive } from "./primitive.mjs";

/**
 * Primitive type to create a quad shape.
 */
export class QuadPrimitive extends Primitive {
    vertices;

    constructor() {
        super();
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

    genCmdList() {
        let list = super.genCmdList();
        let poly = new PolygonPrimitive();
        poly.vertex(this.vertices[0].x, this.vertices[0].y);
        poly.vertex(this.vertices[1].x, this.vertices[1].y);
        poly.vertex(this.vertices[2].x, this.vertices[2].y);
        poly.vertex(this.vertices[3].x, this.vertices[3].y);
        list.push(poly);
        // list.push(this);
        return list;
    }
}