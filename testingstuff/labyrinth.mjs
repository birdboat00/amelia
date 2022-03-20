import { randomRangeInt, app, Color, Size, LoopMode, deg2rad } from "../module/mod.mjs";

const kDepth = 10;
const kSize = 1200;
const kBorderMargin = 50;
const kLabSpace = kSize - kBorderMargin * 2;
const kLabyrinthTileSize = 50;
const kLabyrinthSize = kLabSpace / kLabyrinthTileSize;

const generateLabyrinth = (app) => {
    const tiles = [];
    for(let i = 0; i < kLabyrinthSize; i++) {
        for(let j = 0; j < kLabyrinthSize; j++) {
            const num = randomRangeInt(0, 9);
            let vertices = [];
            const x = kBorderMargin + kLabyrinthTileSize * i;
            const y = kBorderMargin + kLabyrinthTileSize * j;
            const xhalf = x + kLabyrinthTileSize / 2;
            const yhalf = y + kLabyrinthTileSize / 2;
            const xfull = x + kLabyrinthTileSize;
            const yfull = y + kLabyrinthTileSize;
            switch(num) {
                // full quad
                case 0: {
                    vertices.push({ x, y });
                    vertices.push({ x: xfull, y });
                    vertices.push({ x: xfull, y: yfull });
                    vertices.push({ x, y: yfull });
                } break;
                // L shape
                case 1: {
                    vertices.push({ x, y });
                    vertices.push({ x: xhalf, y });
                    vertices.push({ x: xhalf, y: yhalf });
                    vertices.push({ x: xfull, y: yhalf });
                    vertices.push({ x: xfull, y: yfull });
                    vertices.push({ x, y: yfull });
                } break;
                // small top-left
                case 2: {
                    vertices.push({ x, y });
                    vertices.push({ x: xhalf, y });
                    vertices.push({ x: xhalf, y: yhalf });
                    vertices.push({ x, y: yhalf });
                } break;
                // rect top
                case 3: {
                    vertices.push({ x, y });
                    vertices.push({ x: xfull, y });
                    vertices.push({ x: xfull, y: yhalf });
                    vertices.push({ x, y: yhalf });
                } break;
                // rect right
                case 4: {
                    vertices.push({ x: xhalf, y });
                    vertices.push({ x: xfull, y });
                    vertices.push({ x: xfull, y: yfull });
                    vertices.push({ x: xhalf, y: yfull });
                } break;
                // rect bottom
                case 5: {
                    vertices.push(
                        { x, y: yhalf },
                        { x: xfull, y: yhalf },
                        { x: xfull, y: yfull },
                        { x, y: yfull }
                    );
                } break;
                // rect left
                case 6: {
                    vertices.push(
                        { x, y },
                        { x: xhalf, y },
                        { x: xhalf, y: yfull },
                        { x, y: yfull }
                    );
                } break;
                // small bottom-right
                case 7: {
                    vertices.push(
                        { x: xhalf, y: yhalf },
                        { x: xfull, y: yhalf },
                        { x: xfull, y: yfull },
                        { x: xhalf, y: yfull }
                    )
                } break;
                // |- shape
                case 8: {
                    vertices.push(
                        { x, y },
                        { x: xfull, y },
                        { x: xfull, y: yhalf },
                        { x: xhalf, y: yhalf },
                        { x: xhalf, y: yfull },
                        { x, y: yfull }
                    );
                } break;
            }
            tiles.push({ i, j, vertices });
        }
    }
    return tiles;
};

const view = (app, model) => {
    const pen = app.pen();

    pen.rotate(deg2rad(0.1 * app.iterations() * app.iterations()));

    for(let tile of model.tiles) {
        pen.poly()
            .vertexList(tile.vertices)
            .color(Color.OldPaper, Color.Black)
            .strokeWeight(4);
    }

    pen.plot();
};

const model = (app) => {
    app.pen().background().color(Color.OldPaper);

    return {
        tiles: generateLabyrinth()
    };
};

const main = () => {
    app()
        .sizeSz(Size.fromPx(kSize, kSize))
        .model(model)
        .view(view)
        .loopmode(LoopMode.NTimes(kDepth))
        .run();
};

main();