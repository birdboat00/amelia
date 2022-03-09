import { Backend } from "./backend.mjs";
import { Canvas2DBackend } from "./canvas2dbackend.mjs";

export const Backends = {
    Null: 0,
    Canvas2D: 1
};

export const getBackendInstance = (backend, canvas) => {
    switch (backend) {
        case Backends.Canvas2D:
            return new Canvas2DBackend(canvas.getContext("2d"));
        case Backends.Null:
        default:
            return new Backend();
    }
}