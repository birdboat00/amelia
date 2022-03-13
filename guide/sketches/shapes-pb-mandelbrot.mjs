// Change the import path to "../module/mod.mjs" to run the code in the editor
import { app, Color, dist, map } from "../../module/mod.mjs";

export const shpbmb = () => {
    const view = (app) => {
        let pen = app.pen();
        pen.background().color(Color.BlackCoffee);

        pen.pixelbuffer((pixels) => {
            const w = 4;
            const h = (w * app.height) / app.width;

            const xmin = -w / 2;
            const ymin = -h / 2;

            const maxIter = 100;
            const xmax = xmin + w;
            const ymax = ymin + h;

            const dx = (xmax - xmin) / (app.width);
            const dy = (ymax - ymin) / (app.height);

            let y = ymin;
            for (let j = 0; j < app.height; j++) {
                let x = xmin;
                for (let i = 0; i < app.width; i++) {
                    let a = x;
                    let b = y;
                    let n = 0;
                    while (n < maxIter) {
                        const aa = a * a;
                        const bb = b * b;
                        const twoab = 2 * a * b;
                        a = aa - bb + x;
                        b = twoab + y;

                        if (dist(aa, bb, 0, 0) > 16) {
                            break;
                        }
                        n++;
                    }

                    const pix = (i + j * app.width) * 4;
                    const norm = map(n, 0, maxIter, 0, 1);
                    let bright = map(Math.sqrt(norm), 0, 1, 0, 255);
                    if (n == maxIter) {
                        bright = 0;
                    } else {
                        pixels[pix + 0] = bright;
                        pixels[pix + 1] = bright;
                        pixels[pix + 2] = bright;
                        pixels[pix + 3] = 255;
                    }
                    x += dx;
                }
                y += dy;
            }
        });

        pen.plot();
    }

    app().size(300, 200).view(view).parent("shpbmb-ex").once().run();
};

// To run the the code in the editor uncomment the next line
// shpbmb();