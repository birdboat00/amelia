import { DrawCommand } from "./drawcommand.js";
import { Color } from "./../color.js";
import { SetColor } from "./state.js";
export class Primitive extends DrawCommand {
    constructor() {
        super();
        this.posX = 0;
        this.posY = 0;
        this.strokeColor = Color.Black;
        this.fillColor = Color.White;
        this.weight = 1;
    }
    color(fillColor, strokeColor) {
        this.fillColor = fillColor;
        this.strokeColor = strokeColor || fillColor;
        return this;
    }
    x(x) {
        this.posX = x;
        return this;
    }
    y(y) {
        this.posY = y;
        return this;
    }
    xy(x, y) {
        this.x(x);
        this.y(y);
        return this;
    }
    strokeWeight(weight) {
        this.weight = weight;
        return this;
    }
    getCmdList() {
        return [
            new SetColor(this.fillColor, this.strokeColor)
            // new SetRotation(this.rotation)
        ];
    }
}
