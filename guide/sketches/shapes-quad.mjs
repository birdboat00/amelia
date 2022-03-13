// Change the import path to "../module/mod.mjs" to run the code in the editor
import { app, Color } from "../../module/mod.mjs";

export const shquad = () => {
    const view = (app) => {
        let pen = app.pen();
        pen.background().color(Color.BitterLemon);
        pen.quad()
            .points(20, 20, 180, 40, 180, 180, 50, 160)
            .color(Color.BlackCoffee);

        pen.text().xy(20, 20).color(Color.Red).text("a");
        pen.text().xy(180, 40).color(Color.Red).text("b");
        pen.text().xy(180, 180).color(Color.Red).text("c");
        pen.text().xy(50, 160).color(Color.Red).text("d");

        pen.plot();
    }

    app().size(200, 200).view(view).parent("shquad-ex").once().run();
};

// To run the the code in the editor uncomment the next line
// shquad();