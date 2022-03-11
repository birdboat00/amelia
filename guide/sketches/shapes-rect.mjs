import { app, Color } from "../../module/mod.mjs";

export const shrect = () => {
    const view = (app) => {
        let pen = app.pen();
        pen.background().color(Color.BlackCoffee);
        pen.rect().xy(20, 20).wh(160, 160).color(Color.Amber);
        pen.rect().xy(40, 40).wh(50, 50).color(Color.Plum);
        pen.rect().xy(110, 110).wh(50, 50).color(Color.BabyBlue);
        pen.plot();
    }

    app().size(200, 200).view(view).parent("shrect-ex").once().run();
};

// To run the the code in the editor uncomment the next line
// shrect();