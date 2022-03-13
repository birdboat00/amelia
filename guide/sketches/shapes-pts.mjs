import { app, Color } from "../../module/mod.mjs";

export const shpts = () => {
    const view = (app) => {
        let pen = app.pen();
        pen.background().color(Color.Champagne);

        for (let x = 20; x <= app.width - 20; x += 10) {
            for (let y = 20; y <= app.height - 20; y += 10) {
                pen.point().xy(x, y).color(Color.BlackCoffee);
            }
        }

        pen.plot();
    }

    app().size(200, 200).view(view).parent("shpts-ex").once().run();
};

// To run the the code in the editor uncomment the next line
// shpts();