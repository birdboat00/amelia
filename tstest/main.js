import { app, Color, BlendMode, randomRange, map } from "./../dist/files/mod.js";

const organic_view = (app, model) => {
    let pen = app.pen();

    pen.blendmode(BlendMode.Multiply);

    let x = app.width / randomRange(70, 1000);


    for (let i = 0; i < app.height * 2; i += x) {
        let xp = app.width / 2 + (Math.tan(i) * i) / (x * 2);
        let yp = app.height - i;
        let hue = map(x, app.width / 1000, app.width / 70, 130, 50);
        pen
            .rect()
            .xy(xp, yp)
            .wh(x, x)
            .color(Color.fromHsl(hue / 359, 50 / 200, 65 / 200));

    }

    pen.plot();
};

const organic_model = (app) => {
    app.pen().background().color(Color.fromHex(0xfff7f0ff));
    return {};
};

app()
    .size(600, 600)
    .view(organic_view)
    .model(organic_model)
    .run();