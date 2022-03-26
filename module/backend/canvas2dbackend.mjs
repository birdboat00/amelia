import { Backend } from "./backend.mjs";

export class Canvas2DBackend extends Backend {
    ctx;

    globalRotation;

    constructor(context) {
        super();
        this.ctx = context;
        this.globalRotation = 0;
    }

    beginCmd() {
        const blendmode = this.ctx.globalCompositeOperation;

        this.ctx.save();

        this.ctx.globalCompositeOperation = blendmode;
        this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
        this.ctx.rotate(this.globalRotation);
        this.ctx.translate(-this.ctx.canvas.width / 2, -this.ctx.canvas.height / 2);
    }

    endCmd() {
        this.ctx.restore();
    }

    globalRotate(rotation) {
        this.globalRotation = rotation;
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
        this.ctx.fillStyle = color.fillColor.css;
        this.ctx.strokeStyle = color.strokeColor.css;
    }

    clearBackground(background) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = background.col.css;
        this.ctx.strokeStyle = background.col.css;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    drawRect(rect) {
        if (!rect.noFill) this.ctx.fillRect(rect.pos.x, rect.pos.y, rect.sz.width, rect.sz.height);
        if (!rect.noStroke) this.ctx.strokeRect(rect.pos.x, rect.pos.y, rect.sz.width, rect.sz.height);
    }

    drawLine(line) {
        if (line.noStroke) return;

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

        if (!arc.noStroke) this.ctx.stroke();
        if (!arc.noFill) this.ctx.fill();
    }

    drawText(text) {
        this.ctx.font = `${text.fontSize}px ${text.fontName}`;

        if (!text.noStroke) this.ctx.strokeText(text.displayString, text.pos.x, text.pos.y);
        if (!text.noFill) this.ctx.fillText(text.displayString, text.pos.x, text.pos.y);
    }

    drawPoint(point) {
        if (point.noStroke) return;
        this.ctx.beginPath();
        this.ctx.ellipse(point.pos.x, point.pos.y, 0.4, 0.4, 0, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    drawPolygon(poly) {
        this.ctx.lineWidth = poly.weight;

        this.ctx.beginPath();
        this.ctx.moveTo(poly.vertices[0].x, poly.vertices[0].y);
        for (let i = 1; i < poly.vertices.length; i++) {
            this.ctx.lineTo(poly.vertices[i].x, poly.vertices[i].y);
        }
        this.ctx.closePath();

        if (!poly.noStroke) this.ctx.stroke();
        if (!poly.noFill) this.ctx.fill();
    }

    drawBezier(cmd) {
        if (cmd.noStroke) return;
        this.ctx.lineWidth = cmd.weight;

        this.ctx.beginPath();
        this.ctx.moveTo(cmd.pos.x, cmd.pos.y);
        this.ctx.bezierCurveTo(cmd.cp1x, cmd.cp1y, cmd.cp2x, cmd.cp2y, cmd.ap2x, cmd.ap2y);
        this.ctx.stroke();
    }

    drawQuadratic(cmd) {
        if (cmd.noStroke) return;
        this.ctx.lineWidth = cmd.weight;

        this.ctx.beginPath();
        this.ctx.moveTo(cmd.pos.x, cmd.pos.y);
        this.ctx.quadraticCurveTo(cmd.cpx, cmd.cpy, cmd.endx, cmd.endy);
        this.ctx.stroke();
    }

    modifyPixelBuffer(pb) {
        let data = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        pb.bufferModifyFn(data.data);
        this.ctx.putImageData(data, 0, 0);
    }
}