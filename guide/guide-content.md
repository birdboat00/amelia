# Guide

> You can find the old guide [here](../oldguide/).

This guide walks you through setting up and using amelia for you generative-art
projects.

All examples in this guide are editable in the [amelia web editor](../editor/). Just hover click
on the **Look at code** link on the bottom right on examples and it opens the code
in the web editor.

![](./organic2.png)

## Sections

1. [What is amelia?](#what-is-amelia)
1. [Getting started](#getting-started)
    - [Using it as an ESM module](#using-it-as-an-esm-module)
    - [Using it in the web editor](#using-it-in-the-web-editor)
    - [The first sketch](#the-first-sketch)
        - [Creating an app](#creating-an-app)
          - [Quickstart](#quickstart)
        - [The model](#the-model)
        - [The view](#the-view)
        - [Drawing a rectangle](#drawing-a-rectangle)
1. [Drawing shapes](#drawing-shapes)
1. [Going more advanced]()
    - [The App and AppBuilder](#the-app-and-appbuilder)
    - [The Drawer](#the-drawer)
    - [Sizes](#sizes)
    - [Loop modes](#loop-modes)
1. [Technical information](#technical-infomation)

## What is amelia?

Amelia is an open-source creative-coding toolkit for modern JavaScript.

It is meant to be a simple and function collection of API's to rapidly create
good looking sketches. It puts an emphasis on the following aspects:

- **lightweight** - at the moment ~50kb in size
- **functional** - simple and easy to use function style API with a lot of
  functionality
- **fast** - tries to be as fast as possible by being a thin wrapper around the
  2D Canvas API

You can find the code on [GitHub](https://github.com/birdboat00/amelia). There
is also a gallery of examples that you can find [here](../examples/).

> Amelia is still very young and heavily work-in-progress so a lot of stuff might change.

## Getting started

Amelia is a collection of building blocks that help you create creative
generative art. Lets take a look on how to use it.

### Using it as an ESM module

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

### Using it in the web editor
> The web editor is still very work-in-progress!

Go to [the editor site](../editor/index.html) and enter the code into the
editor on the right and click the **Run Code** button on the top right.

You have to import the module from `../module/mod.mjs` like this:
```js
import { app, Color } from "../module/mod.mjs";
```

### The first sketch

Amelia provides an `App` object that is the heart of your amelia sketch. It
provides a `Drawer` which is the _Pen_ of your sketch, provides the loop that
loops through our `view` function and does some other nice stuff.

#### Creating an app

Amelia has some handy functionality to quickly create an `App`. This is done using
the `AppBuilder` class via the `app` function. You use it like this:

```js
app()
  .model(model)
  .view(view)
  .run();
```

This will create an empty canvas in your html and start running the app. If you
want your canvas added as a child to some HTML element you can pass its ID to
`.parent(id)`.

##### Quickstart
You can also quickly create an `App` using the `quickstart` function. It defaults the
size to 400x400 pixels if you don't give it a width and height and accepts only a
view function and automatically runs the `App`.
```js
app().quickstart(view);
```

#### The model

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

#### The view

The `view` function allows you to specify a function that will be called
everytime the app loops. This is where the drawing happens and it's the part of
the sketch where the most time is spent. It is supplied with the app instance
and the model that we supplied to the app in our `model` function.

The view function looks like this:

```js
const view = (app, model) => {
};
```

#### Drawing a rectangle

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
    .wh(60, 60)
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

<div class="cc"><div class="example" id="gs-ex">
    <a class="sclink" href="../editor/?source=../guide/sketches/gettingstarted.mjs">Look at code</a>
</div></div>

## Drawing shapes
The `Drawer` can handle a lot of different primitives which
you can use to create beautiful art.

Here is a list:
- [Rectangles](#rectangles)
- [Circles](#circles)
- [Quads](#quads)
- [Lines](#lines)
- [Arcs](#arcs)
- [Triangles](#triangles)
- [Points](#points)
- [Polygons](#polygons)
- [Text](#text)

All primitives have some basic functionality like setting the
position and setting the color.
- `xy(x, y)`, `x(x)` and `y(y)` to set the position in pixels
- `color(fillColor, strokeColor)` to set the fill and stroke colors
of the primitive. If no stroke color is passed it will use the fill
color.

You can also modify the pixels of the canvas directly using the
`pixelbuffer(bufferModifyFn)` function on the apps pen.
It takes a function with the signature `bufferModifyFn(pixels)`.
The drawer calls that function and passes the pixel data of the canvas
to it. The format is `[r, b, g, a, ...]` with the values in a range
between 0 and 255.

So for example:
```js
// supply the pixel buffer modification function to the drawer.
app.pen().pixelbuffer((pixels) => {
  for(let x = 0; x < app.width; x++) {
    // get the pixel index using the formula x + y * app.height
    let pix = x + 100 * app.height;
    // red value
    pixels[pix] = 255;
    // green value
    pixels[pix + 1] = 255;
    // blue value
    pixels[pix + 2] = 255;
    // alpha value
    pixels[pix + 3] = 255;
  }
});
```
which should draw a white line at the y coordinate `100` from all the
left to all the right.

Here is a simple example of the Mandelbrot set plotted using the
`pixelbuffer` function.

<div class="cc"><div class="example" id="shpbmb-ex">
    <a class="sclink" href="../editor/?source=../guide/sketches/shapes-pb-mandelbrot.mjs">Look at code</a>
</div></div>

### Rectangles
A simple rectangle shape with a width and height.

<div class="cc"><div class="example" id="shrect-ex">
    <a class="sclink" href="../editor/?source=../guide/sketches/shapes-rect.mjs">Look at code</a>
</div></div>

A rectangle has a position which is the top left corner of the
rectangle and it has a width and height which can be set using
- `wh(w, h)`, `w(w)` or `h(h)` to set it directly using pixel sizes
- `size(size)` to set it using the `Size` type.

### Circles
A circle shape with a radius and a center point.

<div class="cc"><div class="example" id="shcircle-ex">
    <a class="sclink" href="../editor/?source=../guide/sketches/shapes-circle.mjs">Look at code</a>
</div></div>

The position of the circle is used as the center point of the circle.
A circle also has a radius which is set using
- `radius(radius)` with a radius in pixels
- `diameter(diameter)` with a diameter in pixels (shorthand for `radius / 2`)

### Quads
Quads are rectangles with flexible corner positions.

<div class="cc"><div class="example" id="shquad-ex">
    <a class="sclink" href="../editor/?source=../guide/sketches/shapes-quad.mjs">Look at code</a>
</div></div>

Quads have edge four edge points: **a**, **b**, **c** and **d**. They can be set using
- `points(ax, ay, bx, by, cx, cy, dx, dy)` with the four edges x and y coordinates

If you set the position of the quad it sets the edge **a** to that
coordinate, same the other way round, if you set the edge **a** you
set the positon of the quad to that coordinate.

### Lines
Lines have a start and end point and draw a line between those.

<div class="cc"><div class="example" id="shline-ex">
    <a class="sclink" href="../editor/?source=../guide/sketches/shapes-line.mjs">Look at code</a>
</div></div>

The start and end points of a line are set with
- `start(x, y)` and `end(x, y)` to set the start and end coordinates seperately
- `points(startX, startY, endX, endY)` to set both start and end points
The start point is always the position of the line, so when you set the
position of the line you also set the start point.


### Arcs
Arcs are lines that curve like a circle with an end and start radius.
You can make cake slices or smiley faces with those!

<div class="cc"><div class="example" id="sharc-ex">
    <a class="sclink" href="../editor/?source=../guide/sketches/shapes-arc.mjs">Look at code</a>
</div></div>

### Triangles
Triangles might be the most important primitive in computer graphics.
They have, like their name suggests, three corners.

<div class="cc"><div class="example" id="shtri-ex">
    <a class="sclink" href="../editor/?source=../guide/sketches/shapes-tri.mjs">Look at code</a>
</div></div>

Triangles have three edge points: **a**, **b** and **c**. Those can be set by calling
- `abc(ax, ay, bx, by, cx, by)` to set them all at once or
- `a(ax, ay)`, `b(bx, by)` and `c(cx, cy)` to set them seperatly

The position of the rectangle is always point **a**.

### Points
Points are single pixels!

<div class="cc"><div class="example" id="shpts-ex">
    <a class="sclink" href="../editor/?source=../guide/sketches/shapes-pts.mjs">Look at code</a>
</div></div>

Points have no special properties. They are just where they are in the color they are.

### Polygons
Polygons are shapes with a number of edges you can define and set
everywhere you want. This allows drawing more complex shapes or maybe
even meshes you load from somewhere.

<div class="cc"><div class="example" id="shpoly-ex">
    <a class="sclink" href="../editor/?source=../guide/sketches/shapes-poly.mjs">Look at code</a>
</div></div>

### Text
Text is another way to express your words with art. Write anything
you want on your canvas.

<div class="cc"><div class="example" id="shtext-ex">
    <a class="sclink" href="../editor/?source=../guide/sketches/shapes-text.mjs">Look at code</a>
</div></div>

Text has some text, a font and a font size. Those are set using
- `text(string)` to set the text
- `font(fontName)` to set the font name
- `size(fontSize)` to set the font size

Text also has a handy function called `measureWidth()`. It measures the width in pixels of the text with its
current settings and returns it.
```js
let text = pen.text().text("I am amelia!");
console.log(text.measureWidth()); // output: 65
```

## Going more advanced
We learned how to do basic drawing in amelia and what different primitives can do.

But the amelia has a lot more functionality than what you have seen yet!

Lets see at what parts of amelia we will look at:
- [The App and AppBuilder](#the-app-and-appbuilder)
- [The Drawer](#the-drawer)
- [Sizes](#sizes)
- [Loop modes](#loop-modes)

### The App and AppBuilder

> Guide work-in-progress

When we launch amelia using the `app()` function, amelia actually
creates an `AppBuilder` instance.

This class has some handy functions that help us to easily create and
amelia `App` using the [builder pattern](https://en.wikipedia.org/wiki/Builder_pattern).
Almost every function of the `AppBuilder` returns the instance itself
so you can chain the function calls like this:

```js
app()
  .size(400, 400)
  .model(model)
  .view(view)
  .once()
  .run();
```

Lets look at what the `AppBuilder` can do for us.

#### Setting the canvas size
Amelia creates a canvas for us, which has to have a size. By default
that size is set to 100x100 pixels but you can make it every size you
want. Even paper format sizes!

There are two ways to set the size:
- `size(width, height)` which sets the size in pixels to width and height
- `sizeSz(size)` which sets the size using the [`Size`](#sizes) type

```js
// Set the size to 300 x 300 pixels
app().size(300, 300);
// Set the size to the DIN-A4 format
app().sizeSz(Size.paperA4);
```

#### Setting the view and model functions
We talked about the view and model function earlier in the guide.
To set them you call:
- `view(viewFunction)` to set the view function
- `model(modelFunction)` to set the model function

If you dont set a view or model function an empty one is used that
does nothing.

#### Setting the parent of the canvas
If you already have some HTML element in your page that you want
your canvas to be added to you can give the `AppBuilder` the ID
of the element that should be used as the parent. You do that by calling
- `parent(parentElementId)` with the ID of the element.

```
// Sets the parent to some-fancy-div
app().parent("some-fancy-div");
```

#### Setting the loop mode of the application
Amelia apps can have different [loop modes](#loop-modes). They
determine how often your app gets rendered per second or how of the
view function getscalled before the app stops calling it. But more on
that later.

This is done by calling `loopmode(loopMode)` with the loop mode you want.
If you want your app to render the canvas just once (which is done for
most of the examples on this page) you can call the shorthand function
`once()` which is a shorthand to calling `loopmode(LoopMode.Once())`.

The default loop mode if none is set is `LoopMode.RefreshSync()` which
uses `requestAnimationFrame`. This renders the app usually at about 60
frames per second on a 60hz monitor.

```
// Runs the app at 10 frames per second
app().loopmode(LoopMode.FrameRate(10));
// Calls the app view function 5 times and then stops
app().loopmode(LoopMode.NTimes(5));
// Calls the app view function only once
app().once();
```

#### Starting the app!
Last but not least we can launch the app!

This is either done by calling
- `run()` which runs the app with the settings you specified
or with
- `quickstart(viewFn, width, height)` which is a shortcut to quickly
start an app!

The `quickstart` function accepts a view function and a width and height which are both set to 400 if no size is given to it. It also runs your app!

```
// Run the app normally
app().size(400, 400).view(view).run();
// Or using the quick start function
app().quickstart(view);
// which also accepts a canvas size
app().quickstart(view, 400, 400);
```

#### The App
After we run the app using the `AppBuilder` first the model function
is called with the app instance.

After that, depending on the loop mode, the view function is called
once or more. The function signature of the view function looks like this:
```
function view(app: App, model: Model) : void
```
The app instance and model is passed to the view function.

The `App` type contains the state of the app and its [Drawer](#the-drawer) which is *the pen* of our app.

The `Drawer` is accessed by calling `pen()` on the app. That returns
the `Drawer` instance you can use to draw stuff onto the canvas.

You can also change the loop mode of the app while it is running by calling
- `loopmode(mode)` with the new mode you want it to use.
The new loop mode is applied at the next frame.

A lot of times you may actually want to get the size of the canvas
or even change the size of the canvas.
To get the size you can access the properties `width` and `height` which
contain the size in pixels.
To set the size of the canvas you can set the properties with the
size in pixels.

```js
// Get the app width and print it to the console
console.log(app.width) // 400
// Set the app height to 500 pixels
app.height = 500;
```

You can also set the size using the [Size](#sizes) type like by calling
- `size(size)` with the size you want.

```
// Set the size to the postcard format.
app.size(Size.paperPostcard)
```

Sometimes you may want to get the number of times the view function
was already called. This is done by calling `iterations()`.

If you want to get the frames per second your app is running at, you
can access the property `fps`.

### The Drawer
> Guide work-in-progress
### Sizes
> Guide work-in-progress
### Loop modes
> Guide work-in-progress

## Technical information
### Where can i report issues?
You can report issues on the [GitHub issue tracker](https://github.com/birdboat00/amelia/issues/).