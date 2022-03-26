// Change the import path to "../module/mod.mjs" to run the code in the editor
import { app, Color } from "../../module/mod.mjs";

const shqcview = (app, _model) => {
    const pen = app.pen();

    pen.background().color(Color.OldPaper);

    pen.quadratic()
        .anchorpts(20, 20, 180, 180)
        .controlpt(20, 180)
        .color(Color.Amaranth);

    // Visualize the anchor points
    pen.circle()
        .xy(20, 20)
        .radius(2)
        .color(Color.Blue);
    pen.circle()
        .xy(180, 180)
        .radius(2)
        .color(Color.Blue);

    // Visualize the control points
    pen.circle()
        .xy(20, 180)
        .radius(2)
        .color(Color.Amber);

    pen.plot();
};

export const shqc = () => {
    app()
        .size(200, 200)
        .view(shqcview)
        .parent("shqc-ex")
        .once()
        .run();
};

// Remove the comment from the next line to run this code in the editor.
// shqc();