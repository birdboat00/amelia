import { app, Color } from "../../module/mod.mjs";

export const shrect = () => {
    const view = (app) => {
        let draw = app.draw();
        draw.background().color(Color.BlackCoffee);
        draw.rect().xy(20, 20).wh(160, 160).color(Color.Amber);
        draw.rect().xy(40, 40).wh(50, 50).color(Color.Plum);
        draw.rect().xy(110, 110).wh(50, 50).color(Color.BabyBlue);
        draw.finish();
    }

    app().size(200, 200).view(view).parent("shrect-ex").once().run();
};