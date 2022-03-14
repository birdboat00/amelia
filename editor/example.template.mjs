import { app, Color, Size } from "../module/mod.mjs";

const view = (app) => {
    let pen = app.pen();

    pen.background().color(Color.Plum);

    pen.circle().xy(150, 150).radius(100).color(Color.Amber);
    pen.rect().xy(100, 100).wh(100, 100).color(Color.Cornflower);

    pen.plot();
};

app().quickstart(view, 300, 300);