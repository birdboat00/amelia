import { app, Color } from "../../module/mod.mjs";

export const shline = () => {
    const view = (app) => {
        let pen = app.pen();
        pen.background().color(Color.BlackCoffee);

        pen.line().points(20, 20, 180, 180).color(Color.CherryBlossom);
        pen.line().points(180, 20, 20, 180).color(Color.CherryBlossom);
        pen.line().points(100, 20, 100, 180).color(Color.CherryBlossom);
        pen.line().points(20, 100, 180, 100).color(Color.CherryBlossom);

        pen.plot();
    }

    app().size(200, 200).view(view).parent("shline-ex").once().run();
};

// To run the the code in the editor uncomment the next line
// shline();