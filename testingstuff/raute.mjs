import { app, Color, randomRangeInt, Size } from "../module/mod.mjs";

const view = (app, model) => {
    const pen = app.pen();

    pen.background().color(Color.OldPaper);

    const width10 = app.width / 100 * 10;
    const height10 = app.height / 100 * 10;

    for(let j = 0; j < 2; j++) {
        let breakRangeL = randomRangeInt(17, 22);
        let breakRangeH = randomRangeInt(37, 42);
        let ctrlPtL = randomRangeInt(breakRangeL, breakRangeH);
        let ctrlPtH = randomRangeInt(breakRangeL, breakRangeH);

        for (let h = 0; h < 2; h++) {
            for (let e = 0; e < 2; e++) {
                pen.bezier()
                .anchorpts(
                    width10 + (breakRangeL * 10) + j * 300 + e * 100, height10 + (breakRangeL * 15) + h * 100,
                    width10 + (breakRangeH * 10) + j * 300 + e * 100, height10 + (breakRangeH * 15) + h * 100
                    )
                .controlpts(
                    width10 + (ctrlPtL * 15) + j * 300 + e * 100, height10 + (ctrlPtL * 15) + h * 100,
                    width10 + (ctrlPtH * 10) + j * 300 + e * 100, height10 + (ctrlPtH * 15) + h
                    );
            }
        }

        for(let i = 0; i < 50; i++) {
            if(i >= breakRangeL && i <= breakRangeH) continue;
            pen.rect()
                .xy(width10 + (i * 10) + j * 300, height10 + (i * 15))
                .wh(100, 100)
                .nofill()
                .color(Color.Black);
        }
    }

    pen.plot();
};

const model = (app) => {
    return {};
};

const main = () => {
    app()
        .size(1200, 1200)
        .model(model)
        .view(view)
        .once()
        .run();
};

main();