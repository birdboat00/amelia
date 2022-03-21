import { app, pingpong, Color } from "../module/mod.mjs";

const view = (app, _model) => {
    const pen = app.pen();

    pen.background().color(Color.Black);

    const ballX = pingpong(app.iterations(), 600);
    console.log(ballX);

    pen.circle()
        .xy(pingpong(app.iterations(), 600), 50)
        .radius(5)
        .color(Color.Amaranth, Color.Amethyst);

    pen.plot();
};

const main = () => {
    app()
        .size(600, 100)
        .view(view)
        .run();
};

main();