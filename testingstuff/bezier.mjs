import { app, Color } from "../module/mod.mjs";

const view = (app, _model) => {
    const pen = app.pen();

    pen.background().color(Color.OldPaper);

    pen.bezier()
        .anchorpts(50, 20, 180, 100)
        .controlpts(230, 30, 150, 80)
        .color(Color.Amaranth);

    pen.plot();
};

const main = () => {
    app()
        .size(200, 200)
        .view(view)
        .once()
        .run();
};

main();