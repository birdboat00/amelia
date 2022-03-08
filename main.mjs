import { app, Color, BlendMode, randomRange, map } from "./module/mod.mjs";

const organic_view = (app, model) => {
    let drawer = app.draw();

    drawer.blendMode(BlendMode.Multiply);

    let x = app.width / randomRange(70, 1000);


    for(let i = 0; i < app.height * 2; i += x) {
        let xp = app.width / 2 + (Math.tan(i) * i) / (x * 2);
        let yp = app.height - i;
        let hue = map(x, app.width / 1000, app.width / 70, 130, 50);
        drawer
            .rect()
            .xy(xp, yp)
            .wh(x, x)
            .color(Color.fromHsl(hue / 359, 50 / 200, 65 / 200));

    }

    drawer.finish();
};

const organic_model = (app) => {
    app.draw().background().color(Color.fromHex(0xfff7f0ff));

    setInterval(() => {
        console.log(app.fps);
    }, 1000);

    return {};
};

const rainbow_view = (app) => {
    const draw = app.draw();

    draw.background().color(Color.White);

    draw.rect()
        .xy(0, 0).wh(400, 60)
        .color(Color.fromBytes(255, 0, 0));

    draw.rect()
        .xy(0, 60).wh(400, 60)
        .color(Color.fromBytes(255, 165, 0));

    draw.rect()
        .xy(0, 120).wh(400, 60)
        .color(Color.fromBytes(255, 255, 0));

    draw.rect()
        .xy(0, 180).wh(400, 60)
        .color(Color.fromBytes(0, 255, 0));

    draw.rect()
        .xy(0, 240).wh(400, 60)
        .color(Color.fromBytes(0, 0, 255));

    draw.rect()
        .xy(0, 300).wh(400, 60)
        .color(Color.fromBytes(75, 0, 130));

    draw.rect()
        .xy(0, 360).wh(400, 60)
        .color(Color.fromBytes(148, 0, 211));

    draw.finish();
};

const rainbow_model = (app) => {
    setInterval(() => {
        console.log(app.fps);
    }, 1000);
};

const circleAndTriView = (app, model) => {
    let draw = app.draw();

    draw.background().color(Color.Black);

    draw.circle()
        .xy(model.circlePos.x, model.circlePos.y)
        .radius(10)
        .color(Color.Yellow);

    const triCol = Color.Cyan;
    triCol.a = 0.8;
    draw.tri()
        .xy(100, 100)
        .abc(100, 100, 50, 200, 150, 200)
        .color(triCol);

    draw.finish();
};

const circleAndTriModel = (app) => {
    return { circlePos: { x: 30, y: 30 }};
};

const circleAndTriMp = (app, model, ev) => {
    model.circlePos.x = ev.x;
    model.circlePos.y = ev.y;
};

const main = () => {
    app()
        .size(800, 800)
        .model(organic_model)
        .view(organic_view)
        .run();
};

main();