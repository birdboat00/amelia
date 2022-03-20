// Change the import path to "../module/mod.mjs" to run the code in the editor
import { app, Color } from "../../module/mod.mjs";

export const sharc = () => {
    const view = (app) => {
        let pen = app.pen();
        pen.background().color(Color.CherryBlossom);

        pen.arc().circle().xy(70, 70).radius(5).color(Color.PastellRed);
        pen.arc().circle().xy(125, 70).radius(5).color(Color.PastellRed);

        pen.arc().xy(100, 100).radius(40).start(0).end(Math.PI).color(Color.BlackCoffee);

        pen.plot();
    }

    app().size(200, 200).view(view).parent("sharc-ex").once().run();
};

// To run the the code in the editor uncomment the next line
// sharc();