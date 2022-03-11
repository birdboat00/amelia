import { app, Color } from "../../module/mod.mjs";

export const gse = () => {
    const view = (app) => {
        let pen = app.pen();
        pen.background().color(Color.Orange);
        pen.rect().xy(20, 20).wh(160, 160).color(Color.Plum);
        pen.plot();
    }

    app().size(200, 200).view(view).parent("gs-ex").once().run();
};

// To run the the code in the editor uncomment the next line
// gse();