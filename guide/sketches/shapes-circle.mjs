import { app, Color } from "../../module/mod.mjs";

export const shcircle = () => {
    const view = (app) => {
        let draw = app.draw();
        draw.background().color(Color.Plum);
        draw.circle().xy(100, 100).radius(50).color(Color.Amber, Color.BlackCoffee);
        draw.circle().xy(100, 100).diameter(20).color(Color.BabyBlue);
        draw.finish();
    }

    app().size(200, 200).view(view).parent("shcircle-ex").once().run();
};