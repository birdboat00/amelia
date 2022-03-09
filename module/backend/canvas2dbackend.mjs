import { Backend } from "./backend.mjs";

export class Canvas2DBackend extends Backend {
    ctx;

    constructor(context) {
        super();
        this.ctx = context;
        // anti-alias fix
        this.ctx.translate(0.5, 0.5);
    }

    beginCmd() {
        // this.ctx.save();
    }

    endCmd() {
        // this.ctx.restore();
    }

    setBlendMode(blendMode) {
        this.ctx.globalCompositeOperation = blendMode.mode;
    }

    setOrigin(origin) {
        this.ctx.translate(origin.x, origin.y);
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
        this.ctx.fillRect(rect.pos.x, rect.pos.y, rect.size.w, rect.size.h);
    }

    drawLine(line) {
        this.ctx.lineWidth = line.weight;

        this.ctx.beginPath();
        this.ctx.moveTo(line.pos.x, line.pos.y);
        this.ctx.lineTo(line.endpoint.x, line.endpoint.y);
        this.ctx.stroke();
    }

    drawQuad(quad) {
        this.ctx.lineWidth = quad.weight;


        let path = new Path2D();
        path.moveTo(quad.pos.x, quad.pos.y);
        for (let i = 1; i < quad.vertices.length; i++) {
            let vert = quad.vertices[i];
            path.lineTo(vert.x, vert.y);
        }
        path.closePath();

        this.ctx.stroke(path);
        this.ctx.fill(path);
    }

    drawCircle(circle) {
        this.ctx.lineWidth = circle.weight;

        this.ctx.beginPath();
        this.ctx.arc(circle.pos.x, circle.pos.y, circle._radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawArc(arc) {
        this.ctx.lineWidth = arc.weight;

        this.ctx.beginPath();
        this.ctx.arc(arc.pos.x, arc.pos.y, arc.rad, arc.startAngle, arc.endAngle);
        this.ctx.stroke();
        this.ctx.fill();
    }

    drawTriangle(tri) {
        this.ctx.lineWidth = tri.weight;

        this.ctx.beginPath();
        this.ctx.moveTo(tri._a.x, tri._a.y);
        this.ctx.lineTo(tri._b.x, tri._b.y);
        this.ctx.lineTo(tri._c.x, tri._c.y);
        this.ctx.closePath();
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
        for(let i = 1; i < poly.vertices.length; i++) {
            this.ctx.lineTo(poly.vertices[i].x, poly.vertices[i].y);
        }
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    }
}