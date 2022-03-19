import { Primitive } from "./primitive.js";

/**
 * Primitive to draw a polygon shape.
 */
export class PolygonPrimitive extends Primitive {
    vertices: Array<{ x: number, y: number }>;
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
    vertex(x: number, y: number): this {
        this.vertices.push({ x: x, y: y });
        return this;
    }

    /**
     * Push a list of vertices into the verticles list.
     * @param {Array} list - the list of vertices
     * @returns {PolygonPrimitive}
     */
    vertexList(list: Array<{ x: number, y: number }>): this {
        this.vertices.push(...list);
        return this;
    }

    getCmdList() {
        let list = super.getCmdList();
        list.push(this);
        return list;
    }
}