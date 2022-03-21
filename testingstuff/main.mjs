import { app, Color, BlendMode, randomRange, map, Size, LoopMode, randomRangeInt } from "../module/mod.mjs";

const rot_test_view = (app, model) => {
    let pen = app.pen();

    pen.background().color(Color.Black);

    pen.circle()
        .xy(50, 50)
        .color(Color.Amaranth)
        .radius(25);

    pen.rect()
        .xy(100, 100)
        .wh(300, 300)
        .rotation(model.rot)
        .color(Color.White);

    pen.rect()
        .xy(300, 300)
        .wh(100, 100)
        .color(Color.BitterLime);

    model.rot += 0.01;

    pen.plot();
};

const rot_test_model = (app) => {
    return {
        rot: 0
    }
};

const start_rot_test = _ => {
    app()
        .size(500, 500)
        .model(rot_test_model)
        .view(rot_test_view)
        .run();
};

start_rot_test();

const autumncolors_view = (app, model) => {
    let pen = app.pen();

    // pen.background().color(Color.BitterLemon);

    pen.blendMode(BlendMode.Multiply);

    let radius = randomRangeInt(10, 30);
    let x = randomRangeInt(radius * 2 + 20, app.width - radius * 2 + 20);
    let y = randomRangeInt(radius * 2 + 20, app.height - radius * 2 + 20);

    pen.circle()
        .xy(x, y)
        .radius(radius)
        .color(model.colors[randomRangeInt(0, model.colors.length)]);

    pen.plot();
};

const autumncolors_model = (app) => {

    app.pen().background().color(Color.OldPaper);
    app.pen().plot();

    return {
        colors: [
            Color.fromBytes(170, 21, 3, 220),
            Color.fromBytes(199, 66, 5, 220),
            Color.fromBytes(229, 205, 29, 220),
            Color.fromBytes(165, 167, 36, 220)
        ],
        plant: null,
        plantX: app.width / 2,
        plantY: app.height * 9
    };
};

const start_autumncolors = () => {
    app()
        .sizeSz(Size.paperA5)
        .model(autumncolors_model)
        .view(autumncolors_view)
        .loopmode(LoopMode.NTimes(200))
        .run();
};

// start_autumncolors();

const organic_view = (app, model) => {
    let pen = app.pen();

    pen.blendMode(BlendMode.Multiply);

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

    setInterval(() => {
        console.log(app.fps);
    }, 1000);

    return {};
};

const rainbow_view = (app) => {
    const pen = app.pen();

    pen.background().color(Color.White);

    pen.rect()
        .xy(0, 0).wh(400, 60)
        .color(Color.fromBytes(255, 0, 0));

    pen.rect()
        .xy(0, 60).wh(400, 60)
        .color(Color.fromBytes(255, 165, 0));

    pen.rect()
        .xy(0, 120).wh(400, 60)
        .color(Color.fromBytes(255, 255, 0));

    pen.rect()
        .xy(0, 180).wh(400, 60)
        .color(Color.fromBytes(0, 255, 0));

    pen.rect()
        .xy(0, 240).wh(400, 60)
        .color(Color.fromBytes(0, 0, 255));

    pen.rect()
        .xy(0, 300).wh(400, 60)
        .color(Color.fromBytes(75, 0, 130));

    pen.rect()
        .xy(0, 360).wh(400, 60)
        .color(Color.fromBytes(148, 0, 211));

    pen.finish();
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
    /*draw.tri()
        .xy(100, 100)
        .abc(100, 100, 50, 200, 150, 200)
        .color(triCol);*/

    draw.finish();
};

const circleAndTriModel = (app) => {
    return { circlePos: { x: 30, y: 30 } };
};

const circleAndTriMp = (app, model, ev) => {
    model.circlePos.x = ev.x;
    model.circlePos.y = ev.y;
};

/*const main = () => {
    app()
        .sizeSz(Size.paperA5)
        // .model(organic_model)
        .view(organic_view)
        .run();
};

main();*/