import { app, Color } from "../module/mod.mjs";

const view = (app) => {
    let pen = app.pen();

    pen.background().color(Color.Black);

    pen.plot();
}

app()
    .size(400, 400)
    .parent("example")
    .view(view)
    .run();