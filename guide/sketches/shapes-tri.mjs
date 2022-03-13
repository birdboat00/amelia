// Change the import path to "../module/mod.mjs" to run the code in the editor
import { app, Color } from "../../module/mod.mjs";

export const shtri = () => {
    const view = (app) => {
        let pen = app.pen();
        pen.background().color(Color.Amber);

        pen.tri().abc(20, 20, 160, 20, 20, 160).color(Color.Plum);
        pen.tri().abc(180, 180, 20, 180, 180, 20).color(Color.Cornflower);

        pen.plot();
    }

    app().size(200, 200).view(view).parent("shtri-ex").once().run();
};

// To run the the code in the editor uncomment the next line
// shtri();