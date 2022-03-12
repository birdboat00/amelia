import { app, BlendMode, Color } from "../../module/mod.mjs";

export const penbm = () => {
    const view = (app) => {
        let pen = app.pen();

        pen.text().xy(10, 10).text("SourceOver").color(Color.Black);

        pen.rect().xy(30, 30).wh(50, 50).color(Color.Red);
        pen.rect().xy(50, 50).wh(50, 50).color(Color.Green);
        pen.rect().xy(70, 70).wh(50, 50).color(Color.Blue);

        pen.line().points(200, 0, 200, 200).color(Color.Black);

        pen.text().xy(210, 10).text("Multiply").color(Color.Black);
        pen.blendMode(BlendMode.Multiply);

        pen.rect().xy(230, 30).wh(50, 50).color(Color.Red);
        pen.rect().xy(250, 50).wh(50, 50).color(Color.Green);
        pen.rect().xy(270, 70).wh(50, 50).color(Color.Blue);

        pen.blendMode(BlendMode.SourceOver);
        pen.line().points(400, 0, 400, 200).color(Color.Black);

        pen.text().xy(410, 10).text("Xor").color(Color.Black);
        pen.blendMode(BlendMode.Xor);

        pen.rect().xy(430, 30).wh(50, 50).color(Color.Red);
        pen.rect().xy(450, 50).wh(50, 50).color(Color.Green);
        pen.rect().xy(470, 70).wh(50, 50).color(Color.Blue);

        pen.plot();
    }

    app().size(600, 200).view(view).parent("penbm-ex").once().run();
};

// To run the the code in the editor uncomment the next line
// penbm();