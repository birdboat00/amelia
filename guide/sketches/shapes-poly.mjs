import { app, Color } from "../../module/mod.mjs";

export const shpoly = () => {
    const view = (app) => {
        let pen = app.pen();
        pen.background().color(Color.Bittersweet);

        pen.poly()
            .vertex(50, 20)
            .vertex(150, 20)
            .vertex(180, 50)
            .vertex(180, 150)
            .vertex(150, 180)
            .vertex(50, 180)
            .vertex(20, 150)
            .vertex(20, 50)
            .color(Color.Amethyst);

            // FIXME: wait??? is this buggy? is .vertex not working right?
        pen.poly()
            .vertex(100, 70)
            .vertex(170, 100)
            .vertex(100, 170)
            .vertex(70, 100)
            .color(Color.BananaYellow);

        pen.plot();
    }

    app().size(200, 200).view(view).parent("shpoly-ex").once().run();
};

// To run the the code in the editor uncomment the next line
// shpoly();