import { app, Color } from "../../module/mod.mjs";

export const shcircle = () => {
    const view = (app) => {
        let pen = app.pen();
        pen.background().color(Color.Plum);
        pen.circle().xy(100, 100).radius(50).color(Color.Amber, Color.BlackCoffee);
        pen.circle().xy(100, 100).diameter(20).color(Color.BabyBlue);
        pen.plot();
    }

    app().size(200, 200).view(view).parent("shcircle-ex").once().run();
};