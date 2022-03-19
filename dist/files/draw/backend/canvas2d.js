export class Canvas2DBackend {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext("2d");
    }
    drawPoly(cmd) {
        this.ctx.beginPath();
        this.ctx.moveTo(cmd.vertices[0].x, cmd.vertices[0].y);
        for (let i = 0; i < cmd.vertices.length; i++) {
            this.ctx.lineTo(cmd.vertices[i].x, cmd.vertices[i].y);
        }
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    }
    drawPoint(cmd) {
        this.ctx.beginPath();
        this.ctx.ellipse(cmd.posX, cmd.posY, 0.4, 0.4, 0, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    drawLine(cmd) {
        this.ctx.lineWidth = cmd.weight;
        this.ctx.beginPath();
        this.ctx.moveTo(cmd.posX, cmd.posY);
        this.ctx.lineTo(cmd.endpointX, cmd.endpointY);
        this.ctx.stroke();
    }
    drawArc(cmd) {
        this.ctx.lineWidth = cmd.weight;
        this.ctx.beginPath();
        this.ctx.arc(cmd.posX, cmd.posY, cmd.rad, cmd.startAngle, cmd.endAngle);
        this.ctx.fill();
        this.ctx.stroke();
    }
    drawCircle(cmd) {
        this.ctx.lineWidth = cmd.weight;
        this.ctx.beginPath();
        this.ctx.arc(cmd.posX, cmd.posY, cmd._radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
    }
    modifyPixelBuffer(cmd) {
        let data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        cmd.bufferModifyFn(data.data);
        this.ctx.putImageData(data, 0, 0);
    }
    drawText(cmd) {
        this.ctx.font = `${cmd.fontSize}px ${cmd.fontName}`;
        this.ctx.fillText(cmd.displayString, cmd.posX, cmd.posY),
            this.ctx.strokeText(cmd.displayString, cmd.posX, cmd.posY);
    }
    setColor(cmd) {
        this.ctx.fillStyle = cmd.fillColor.css;
        this.ctx.strokeStyle = cmd.strokeColor.css;
    }
    clearBackground(cmd) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    drawRect(cmd) {
        this.ctx.fillRect(cmd.posX, cmd.posY, cmd.sz.width, cmd.sz.height);
    }
    beginCmd() {
        let blendmode = this.ctx.globalCompositeOperation;
        this.ctx.save();
        this.ctx.globalCompositeOperation = blendmode;
    }
    endCmd() {
        this.ctx.restore();
    }
}
