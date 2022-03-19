import { Background } from "../background.js";
import { ModifyPixelBuffer } from "../pixelbuffer.js";
import { RectPrimitive } from "../rect.js";
import { SetColor } from "../state.js";
import { TextPrimitive } from "../text.js";
import { CirclePrimitive } from "../circle.js";
import { ArcPrimitive } from "../arc.js";
import { LinePrimitive } from "../line.js";
import { PointPrimitive } from "../point.js";
import { PolygonPrimitive } from "../poly.js";

export interface Backend {
    beginCmd(): void;
    endCmd(): void;
    setColor(cmd: SetColor): void;
    clearBackground(cmd: Background): void;
    drawRect(cmd: RectPrimitive): void;
    drawText(cmd: TextPrimitive): void;
    modifyPixelBuffer(cmd: ModifyPixelBuffer): void;
    drawCircle(cmd: CirclePrimitive): void;
    drawArc(cmd: ArcPrimitive): void;
    drawLine(cmd: LinePrimitive): void;
    drawPoint(cmd: PointPrimitive): void;
    drawPoly(cmd: PolygonPrimitive): void;
}