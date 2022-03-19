import { DrawCommand } from "./drawcommand.js";
import { Color } from "./../color.js";
import { SetColor } from "./state.js";

export class Primitive extends DrawCommand {
    posX: number;
    posY: number;
    weight: number;
    fillColor: Color;
    strokeColor: Color;

    constructor() {
        super();

        this.posX = 0;
        this.posY = 0;
        this.strokeColor = Color.Black;
        this.fillColor = Color.White;
        this.weight = 1;
    }

    color(fillColor: Color, strokeColor: Color): this {
        this.fillColor = fillColor;
        this.strokeColor = strokeColor || fillColor;
        return this;
    }

    x(x: number): this {
        this.posX = x;
        return this;
    }

    y(y: number): this {
        this.posY = y;
        return this;
    }

    xy(x: number, y: number): this {
        this.x(x);
        this.y(y);
        return this;
    }

    strokeWeight(weight: number): this {
        this.weight = weight;
        return this;
    }

    getCmdList(): DrawCommand[] {
        return [
            new SetColor(this.fillColor, this.strokeColor)
            // new SetRotation(this.rotation)
        ];
    }
}