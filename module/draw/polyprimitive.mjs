import { Primitive } from "./primitive.mjs";

/**
 * Primitive to draw a polygon shape.
 */
export class PolygonPrimitive extends Primitive {
    vertices;
    constructor() {
        super();

        this.vertices = [];
    }

    /**
     * Push a vertex into the vertices list.
     * @param {number} x - the x coordinate of the vertex
     * @param {number} y - the y coordiante of the vertex
     * @returns {PolygonPrimitive}
     */
    vertex(x, y) {
        this.vertices.push({ x, y });
        return this;
    }

    /**
     * Push a list of vertices into the verticles list.
     * @param {Array} list - the list of vertices
     * @returns {PolygonPrimitive}
     */
    vertexList(list) {
        this.vertices.push(...list);
        return this;
    }

    vertexIndex(index, x, y) {
        this.vertices[index].x = { x, y };
    }

    /**
     * Create a quad polygon.
     * @param {number} ax a point x coord
     * @param {number} ay a point y coord
     * @param {number} bx b point x coord
     * @param {number} by b point y coord
     * @param {number} cx c point x coord
     * @param {number} cy c point y coord
     * @param {number} dx d point x coord
     * @param {number} dy d point y coord
     * @returns {PolygonPrimitive}
     */
    quad(ax, ay, bx, by, cx, cy, dx, dy) {
        this.vertex(ax, ay);
        this.vertex(bx, by);
        this.vertex(cx, cy);
        this.vertex(dx, dy);
        return this;
    }

    /**
     * Create a triangle polygon.
     * @param {number} ax a point x coord
     * @param {number} ay a point y coord
     * @param {number} bx b point x coord
     * @param {number} dy b point y coord
     * @param {number} cx c point x coord
     * @param {number} cy c point y coord
     * @returns {PolygonPrimitive}
     */
    tri(ax, ay, bx, dy, cx, cy) {
        this.vertex(ax, ay);
        this.vertex(bx, by);
        this.vertex(cx, cy);
        return this;
    }

    genCmdList() {
        let list = super.genCmdList();
        list.push(this);
        return list;
    }
}