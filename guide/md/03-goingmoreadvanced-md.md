# Going more advanced
We learned how to do basic drawing in amelia and what different primitives can do.

But the amelia has a lot more functionality than what you have seen yet!

Lets see at what parts of amelia we will look at:
- [The App and AppBuilder](#the-app-and-appbuilder)
- [The Drawer](#the-drawer)
- [Sizes](#sizes)
- [Loop modes](#loop-modes)

## The App and AppBuilder

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

### Setting the canvas size
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

### Setting the view and model functions
We talked about the view and model function earlier in the guide.
To set them you call:
- `view(viewFunction)` to set the view function
- `model(modelFunction)` to set the model function

If you dont set a view or model function an empty one is used that
does nothing.

### Setting the parent of the canvas
If you already have some HTML element in your page that you want
your canvas to be added to you can give the `AppBuilder` the ID
of the element that should be used as the parent. You do that by calling
- `parent(parentElementId)` with the ID of the element.

```
// Sets the parent to some-fancy-div
app().parent("some-fancy-div");
```

### Setting the loop mode of the application
Amelia apps can have different [loop modes](#loop-modes). They
determine how often your app gets rendered per second or how of the
view function getscalled before the app stops calling it. But more on
that later.

This is done by calling `loopmode(loopMode)`, `framerate(frameRate)` or
`ntimes(times)`.
If you want your app to render the canvas just once (which is done for
most of the examples on this page) you can call the shorthand function
`once()` which is a shorthand to calling `loopmode(LoopMode.Once())`.

The default loop mode if none is set is `LoopMode.RefreshSync()` which
uses `requestAnimationFrame`. This renders the app usually at about 60
frames per second on a 60hz monitor.

```
// Runs the app at 10 frames per second
app().loopmode(LoopMode.FrameRate(10));
app().framerate(10);
// Calls the app view function 5 times and then stops
app().loopmode(LoopMode.NTimes(5));
app().ntimes(5);
// Calls the app view function only once
app().once();
```

### Starting the app!
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

### The App
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

## The Drawer
The drawer is what creates all your primitives and directs the
draw commands to the backend. Imagine it like the pen of the amelia
app (which is why its accessed through the `App.pen` function).

The drawer does not only create all the primitives we talked about
before and give us access to the pixel buffer, it also has a state
which holds the following properties:
- [Blend mode](#the-blend-modes)

Lets look at all of them.

### The blend modes
The blend mode is what determines how colors are mixed when
you draw one pixel over another. The blend mode is kept until
set to another blend mode.

It is set using the `Drawer.blendMode(mode)` function which needs
a `BlendMode`.

There are the following blend modes:
- `SourceOver` which is the default blend mode. This overwrites the older color with the newer one
- `Multiply` multiplies the newer color with the older one and
- `Xor` which makes colors transparent when they are overdrawn and
draws the color normally otherwise.

<div class="cc"><div class="example" id="penbm-ex">
    <a target="_blank" class="sclink" href="../editor/?source=../guide/sketches/pen-blendmodes.mjs">Look at code</a>
</div></div>

## Loop modes
Amelia apps can have different loop modes. They determine how the
`view` function is looped and called.

There are loop modes that loop continuously without ever stopping
and ones that are called a number of times and then stop the app.

The loop mode is set using the `AppBuilder.loopmode(mode)` function when
building the app or at runtime using the `App.loopmode(mode)` function.

The loop modes are defined in the `LoopMode` class.

Lets look at them:
- [RefreshSync](#refreshsync) (the default loop mode)
- [FrameRate](#framerate)
- [NTimes and Once](#ntimes-and-once)

### RefreshSync
This loop mode is created by calling `LoopMode.RefreshSync()`. It uses
the `requestAnimationFrame` function of your browser. This usually
calls your view function at about the refresh rate of your monitor
or when your browser is ready to draw the next frame.

```js
app().view(view).loopmode(LoopMode.RefreshSync()).run();
```

### FrameRate
The `LoopMode.FrameRate(frameRate)` calls your view function at a
the `frameRate` you want it called. So for example if you want the
view function to be called once per second you would do:

```js
app().view(view).loopmode(LoopMode.FrameRate(1)).run();
```

Internally this loop mode uses `setTimeout`.

### NTimes and Once
The `LoopMode.NTimes(times)` loop mode calls your view function
a number of times and then stops the app. It loops at the speed
of `requestAnimationFrame`. If you want your view function to
be only called once you can use `LoopMode.Once()` which is a
shorthand to `LoopMode.NTimes(1)`.

```js
// This would call view 50 times.
app().view(view).loopmode(LoopMode.NTimes(50)).run();
// Call view only once and then stop:
app().view(view).loopmode(LoopMode.Once()).run();
```

To make your app run only once you can also use the `AppBuilder.once()`
shorthand which sets the `LoopMode` to `Once`.

## Sizes
Amelia has a handy utility type to create sizes. Its the `Size` type.

A size has a width and height in pixels. To access the them you use
- `Size.width` and `Size.height` on your size instance.

There are builder functions to create a size from millimeters or inches.
- `Size.fromPx(w, h)` to create a size from pixels
- `Size.fromMillimeters(w, h)` to create a size from millimeters
- `Size.fromInches(w, h)` to create a size from inches.

You can also modify the sizes of an already created size by setting the
`Size.width` and `Size.height` properties.

Sizes can be turned either portrait or landscape using
- `Size.portrait()` to make the longer side the height and shorter side the width
- `Size.landscape()` to make the shorter side the height and longer side the width

There are also some pre-defined sizes based on common paper sizes. They
use the default CSS-spec DPI of 96 pixels-per-inch to calculate the
pixel size of the size from millimeters or inches. They are:
- DIN sizes: `paperA3 paperA4 paperA5 paperA6 paperA7`
- American sizes: `paperLetter paperHalfLetter paperPostcard`
- Other sizes: `paperCarreL`

To compare sizes you can use the `Size.min` and `Size.max` functions.
Those returns a size with the shortest or longest widths and height
of the two supplied sizes.

To create random size between zero and one you can use `Size.random`.
To create size of zero you can use `Size.zero`.

## Colors
Colors are an important part of art. Amelia has the `Color` type to
represent RGBA colors.
The red, green, blue and alpha values are accessed using the
`r`, `g`, `b` and `a` properties of the Color instance.

You can create new colors using:
- `Color.fromRgba8(r, g, b, a)` with values from 0 to 255
- `Color.fromRgba(r, b, b, a)` with values from 0 to 1
- `Color.fromHsl(hue, saturation, luminance)` with values from 0 to 1

There is also a big number of pre-defined colors you can use.

[Next: Technical information](./04-technicalinfo.html)