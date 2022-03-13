# Getting started

Amelia is a collection of building blocks that help you create creative
generative art. Lets take a look on how to use it.

## Using it as an ESM module

First download amelia from the
[GitHub repository](https://github.com/birdboat00/amelia/) and copy the `module`
folder into your project.
You can also import amelia from jsDelivr, if you do that you don't need to
download it from GitHub.

Create a new script and include it into your HTML like this:
```html
<script type="module" src="path/to/your/script.mjs"></script>
```

It is important that you include it as a `type="module"` as amelia uses ESM
modules.

Now you can finally import amelia into your script like this:
```js
import { app } from "path/to/amelia/mod.mjs";
```

or if you get it from jsDelivr:
```js
import { app } from "https://cdn.jsdelivr.net/gh/birdboat00/amelia/module/mod.mjs";
```

## Using it in the web editor
> The web editor is still very work-in-progress!

Go to [the editor site](../editor/index.html) and enter the code into the
editor on the right and click the **Run Code** button on the top right.

You have to import the module from `../module/mod.mjs` like this:
```js
import { app, Color } from "../module/mod.mjs";
```

## The first sketch

Amelia provides an `App` object that is the heart of your amelia sketch. It
provides a `Drawer` which is the _Pen_ of your sketch, provides the loop that
loops through our `view` function and does some other nice stuff.

### Creating an app

Amelia has some handy functionality to quickly create an `App`. This is done using
the `AppBuilder` class via the `app` function. You use it like this:

```js
app()
  .size(300, 300)
  .model(model)
  .view(view)
  .run();
```

This will create an empty canvas in your html and start running the app. If you
want your canvas added as a child to some HTML element you can pass its ID to
`.parent(id)`.

#### Quickstart
You can also quickly create an `App` using the `quickstart` function. It defaults the
size to 400x400 pixels if you don't give it a width and height and accepts only a
view function and automatically runs the `App`.
```js
app().quickstart(view);
```

### The model

The `model` function when calling `app()` allows you to specify a function that
will be called before the app loops for the first time and supply a state
(model) to the app that you can access in the `view` function.

The model function looks like this:

```js
const model = (app) => {
  return {};
};
```

The app instance is passed to your model function so you can access it. For now we return a empty
model because we don't have any state yet.

You can imagine the `model` function as the place where you prepare your
pencils, pens and colours.

### The view

The `view` function allows you to specify a function that will be called
everytime the app loops. This is where the drawing happens and it's the part of
the sketch where the most time is spent. It is supplied with the app instance
and the model that we supplied to the app in our `model` function.

The view function looks like this:

```js
const view = (app, model) => {
};
```

### Drawing a rectangle

The app we created has a `Drawer`, imagine it like the pen of our app. It has
the ability to create a lot of primitives with properties like their position,
radius, width and height, color and so on.

Lets draw a a plum colored rectangle on an orange colored background.

First we have to aquire the `Drawer` instance of the app which is done by
calling `.pen()` on the app instance.

```js
const view = (app, model) => {
  let pen = app.pen();
};
```

We want some background so how do we do that? We call the `.background()`
function on the drawer! This gives us a `Background` that we can give a color to
with the `.color()` function.

```js
pen.background()
  .color(Color.Orange);
```

Colors are defined using the `Color` type which has some handy pre-defined
colors, in this case we use `Orange`!

Next we draw a rectangle. We can get a rectangle by calling `.rect()` on the
drawer. There are a lot of other primitives it can draw but more on that later
in the guide.

```js
pen.rect();
```

We also want to give it a position, size and a color.

```js
pen.rect()
    .xy(20, 20)
    .wh(260, 260)
    .color(Color.Plum);
```

With `xy(x, y)` we specify the position. The coordinates are in pixels. By
calling `wh(w, h)` we specify the width and height in pixels. We also want to
paint it in a nice color so we call `color(color)` with the color we want.

After all that we got to finish the frame and actually paint it on the canvas.
This is done by calling `Drawer.plot()` on the drawer.

```js
pen.plot();
```

This should give us the following image:

<div class="cc">
<div class="example" id="gs-ex">
    <a target="_blank" class="sclink" href="../editor/?source=../guide/sketches/gettingstarted.mjs">Look at code</a>
</div>
</div>

[Next: Drawing shapes >](./02-drawingshapes.html)