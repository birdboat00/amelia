// Change the import path to "../module/mod.mjs" to run the code in the editor
import { app, Color } from "../../module/mod.mjs";

const shbzview = (app, _model) => {
    const pen = app.pen();

    pen.background().color(Color.OldPaper);

    pen.bezier()
        .anchorpts(50, 20, 180, 100)
        .controlpts(80, 150, 150, 80)
        .color(Color.Amaranth);

    // Visualize the anchor points
    pen.arc()
        .circle()
        .xy(50, 20)
        .radius(2)
        .color(Color.Blue);
    pen.arc()
        .circle()
        .xy(180, 100)
        .radius(2)
        .color(Color.Blue);

    // Visualize the control points
    pen.arc()
        .circle()
        .xy(80, 150)
        .radius(2)
        .color(Color.Amber);
    pen.arc()
        .circle()
        .xy(150, 80)
        .radius(2)
        .color(Color.Amber);

    pen.plot();
};

export const shbz = () => {
    app()
        .size(200, 200)
        .view(shbzview)
        .parent("shbz-ex")
        .once()
        .run();
};

// Remove the comment from the next line to run this code in the editor.
// shbz();