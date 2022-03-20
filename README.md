# amelia

Amelia is an open-source creative-coding toolkit for modern JavaScript.

Amelia is a collection of APIs meant to make it easy to
create sketches with simple and fast code. It puts an
emphasis on the following aspects:
- **lightweight**: at the moment ~50KB in size.
- **functional**: it has a simple to use and understand functional style API.
- **fast**: tries to be as fast as possible by being a thin wrapper around the Canvas API (with WebGL planned for the future).

Currently it support the following primitives:
- Rectangle (rect)
- Line (line)
- Arc (arc)
- Text (text)
- Point (point)
- Polygon (poly)

The library also supports mouse and keyboard handlers (WIP).

Amelia's API's are inspired by [nannou](https://nannou.cc/) and [p5js](https://p5js.org/).

## Get started

I have prepared a [getting started guide](https://birdboat00.github.io/amelia/guide/).

### Requirements and Download
**amelia** requires a browser that supports ES6 modules.

To use it, download the `module` folder and drop it into
your project. Then you can import the stuff you need
from the `mod.mjs` module like this for example:
```js
import { app, Color } from "path/to/module/mod.mjs";
```

### Example

Here is a quick example on how to use **amelia**.

```JavaScript
import { app, Color } from "./module/mod.mjs";

const view = (app) => {
    let pen = app.pen();

    pen
        .background()
        .color(Color.Black);

    pen
        .rect()
        .xy(50, 50)
        .wh(100, 50)
        .color(Color.Yellow);

    pen.plot();
};

app()
    .size(400, 400)
    .view(view)
    .run();
```

## Goals and Non-Goals
Goals:
- ✅ be simple and lightweight
- ✅ thin wrapper around the canvas API
- ✅ be fast

Non-Goals:
- ❌ replace p5.js or Processing
- ❌ 3D graphics
- ❌ being the fastest

## Disclaimer
It just started working on this library and there is still
a lot of work to be done. Feel free to help out!

## Benchmarks
**TBD**

## License
amelia is licensed under the [MIT license](LICENSE).

## Building the reference to json
```bat
buildref.bat
or
npx jsdoc -c jsdoc.config.json -X -r > ref.json
```