// Change the import path to "../module/mod.mjs" to run the code in the editor
import { app, Color } from "../../module/mod.mjs";

export const shtext = () => {
    const view = (app) => {
        let pen = app.pen();
        pen.background().color(Color.Amber);

        pen.text().xy(20, 20).text("I am some text!").color(Color.Black);
        pen.text().xy(20, 100).text("I am some bigger text").color(Color.Amethyst).size(16);
        pen.text().xy(20, 160).text(":) Smile").color(Color.Emerald).size(30);

        pen.plot();
    }

    app().size(200, 200).view(view).parent("shtext-ex").once().run();
};

// To run the the code in the editor uncomment the next line
// shtext();