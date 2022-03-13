# Drawing shapes
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
    <a target="_blank" class="sclink" href="../editor/?source=../guide/sketches/shapes-pb-mandelbrot.mjs">Look at code</a>
</div></div>

## Rectangles
A simple rectangle shape with a width and height.

<div class="cc"><div class="example" id="shrect-ex">
    <a target="_blank" class="sclink" href="../editor/?source=../guide/sketches/shapes-rect.mjs">Look at code</a>
</div></div>

A rectangle has a position which is the top left corner of the
rectangle and it has a width and height which can be set using
- `wh(w, h)`, `w(w)` or `h(h)` to set it directly using pixel sizes
- `size(size)` to set it using the `Size` type.

## Circles
A circle shape with a radius and a center point.

<div class="cc"><div class="example" id="shcircle-ex">
    <a target="_blank" class="sclink" href="../editor/?source=../guide/sketches/shapes-circle.mjs">Look at code</a>
</div></div>

The position of the circle is used as the center point of the circle.
A circle also has a radius which is set using
- `radius(radius)` with a radius in pixels
- `diameter(diameter)` with a diameter in pixels (shorthand for `radius / 2`)

## Quads
Quads are rectangles with flexible corner positions.

<div class="cc"><div class="example" id="shquad-ex">
    <a target="_blank" class="sclink" href="../editor/?source=../guide/sketches/shapes-quad.mjs">Look at code</a>
</div></div>

Quads have edge four edge points: **a**, **b**, **c** and **d**. They can be set using
- `points(ax, ay, bx, by, cx, cy, dx, dy)` with the four edges x and y coordinates

If you set the position of the quad it sets the edge **a** to that
coordinate, same the other way round, if you set the edge **a** you
set the positon of the quad to that coordinate.

## Lines
Lines have a start and end point and draw a line between those.

<div class="cc"><div class="example" id="shline-ex">
    <a target="_blank" class="sclink" href="../editor/?source=../guide/sketches/shapes-line.mjs">Look at code</a>
</div></div>

The start and end points of a line are set with
- `start(x, y)` and `end(x, y)` to set the start and end coordinates seperately
- `points(startX, startY, endX, endY)` to set both start and end points
The start point is always the position of the line, so when you set the
position of the line you also set the start point.


## Arcs
Arcs are lines that curve like a circle with an end and start radius.
You can make cake slices or smiley faces with those!

<div class="cc"><div class="example" id="sharc-ex">
    <a target="_blank" class="sclink" href="../editor/?source=../guide/sketches/shapes-arc.mjs">Look at code</a>
</div></div>

## Triangles
Triangles might be the most important primitive in computer graphics.
They have, like their name suggests, three corners.

<div class="cc"><div class="example" id="shtri-ex">
    <a target="_blank" class="sclink" href="../editor/?source=../guide/sketches/shapes-tri.mjs">Look at code</a>
</div></div>

Triangles have three edge points: **a**, **b** and **c**. Those can be set by calling
- `abc(ax, ay, bx, by, cx, by)` to set them all at once or
- `a(ax, ay)`, `b(bx, by)` and `c(cx, cy)` to set them seperatly

The position of the rectangle is always point **a**.

## Points
Points are single pixels!

<div class="cc"><div class="example" id="shpts-ex">
    <a target="_blank" class="sclink" href="../editor/?source=../guide/sketches/shapes-pts.mjs">Look at code</a>
</div></div>

Points have no special properties. They are just where they are in the color they are.

## Polygons
Polygons are shapes with a number of edges you can define and set
everywhere you want. This allows drawing more complex shapes or maybe
even meshes you load from somewhere.

<div class="cc"><div class="example" id="shpoly-ex">
    <a target="_blank" class="sclink" href="../editor/?source=../guide/sketches/shapes-poly.mjs">Look at code</a>
</div></div>

## Text
Text is another way to express your words with art. Write anything
you want on your canvas.

<div class="cc"><div class="example" id="shtext-ex">
    <a target="_blank" class="sclink" href="../editor/?source=../guide/sketches/shapes-text.mjs">Look at code</a>
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

[Next: Going more advanced](./03-goingmoreadvanced.html)