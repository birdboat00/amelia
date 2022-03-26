import { app, Color } from "../module/mod.mjs";

const view = (app, model) => {
    const pen = app.pen();

    pen.background().color(Color.White);

    let quadratic = pen.quadratic()
        .controlpt(500, 300)
        .anchorpts(100, 500, 500, 100)
        .color(Color.Black);

    for(let i = 1; i > 0; i -= 0.1) {
        const pt = quadratic.getpt(i);
        const pn = quadratic.getnml(i);
        pen.circle().xy(pt.x, pt.y).radius(4).color(Color.Red);
        pen.line()
            .xy(pt.x - pn.x * 50 * i, pt.y - pn.y * 50 * i)
            .end(pt.x + pn.x * 50 * i, pt.y + pn.y * 50 * i)
            .color(Color.BabyBlue);
    }

    pen.plot();
};

const main = () => {
    app()
        .size(600, 600)
        .view(view)
        .run();
};

main();