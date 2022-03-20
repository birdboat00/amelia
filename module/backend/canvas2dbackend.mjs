import { Backend } from "./backend.mjs";

export class Canvas2DBackend extends Backend {
    ctx;

    constructor(context) {
        super();
        this.ctx = context;
    }

    beginCmd() {
        let blendmode = this.ctx.globalCompositeOperation;
        this.ctx.save();
        this.ctx.globalCompositeOperation = blendmode;
    }

    endCmd() {
        this.ctx.restore();
    }

    setBlendMode(blendMode) {
        this.ctx.globalCompositeOperation = blendMode.mode;
    }

    setOrigin(origin) {
        this.ctx.translate(origin.x, origin.y);
    }

    setRotation(rotation) {
        this.ctx.rotate(rotation.rot);
    }

    setColor(color) {
        this.ctx.fillStyle = color.fillColor.asCss();
        this.ctx.strokeStyle = color.strokeColor.asCss();
    }

    clearBackground(background) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = background.col.asCss();
        this.ctx.strokeStyle = background.col.asCss();
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    drawRect(rect) {
        this.ctx.fillRect(rect.pos.x, rect.pos.y, rect.sz.width, rect.sz.height);
    }

    drawLine(line) {
        this.ctx.lineWidth = line.weight;

        this.ctx.beginPath();
        this.ctx.moveTo(line.pos.x, line.pos.y);
        this.ctx.lineTo(line.endpoint.x, line.endpoint.y);
        this.ctx.stroke();
    }

    drawArc(arc) {
        this.ctx.lineWidth = arc.weight;

        this.ctx.beginPath();
        this.ctx.arc(arc.pos.x, arc.pos.y, arc.rad, arc.startAngle, arc.endAngle);
        this.ctx.stroke();
        this.ctx.fill();
    }

    drawText(text) {
        this.ctx.font = `${text.fontSize}px ${text.fontName}`;

        this.ctx.fillText(text.displayString, text.pos.x, text.pos.y);
        this.ctx.strokeText(text.displayString, text.pos.x, text.pos.y);
    }

    drawPoint(point) {
        this.ctx.beginPath();
        this.ctx.ellipse(point.pos.x, point.pos.y, 0.4, 0.4, 0, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    drawPolygon(poly) {
        this.ctx.beginPath();
        this.ctx.moveTo(poly.vertices[0].x, poly.vertices[0].y);
        for (let i = 1; i < poly.vertices.length; i++) {
            this.ctx.lineTo(poly.vertices[i].x, poly.vertices[i].y);
        }
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    }

    modifyPixelBuffer(pb) {
        let data = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        pb.bufferModifyFn(data.data);
        this.ctx.putImageData(data, 0, 0);
    }
}