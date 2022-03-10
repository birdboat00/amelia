import { app, Color } from "../../module/mod.mjs";

export const gse = () => {
    const view = (app) => {
        let draw = app.draw();
        draw.background().color(Color.Orange);
        draw.rect().xy(20, 20).wh(160, 160).color(Color.Plum);
        draw.finish();
    }

    app().size(200, 200).view(view).parent("gs-ex").once().run();
};