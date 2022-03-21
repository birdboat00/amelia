# Drawing shapes
The `Drawer` can handle a lot of different primitives which
you can use to create beautiful art.

Here is a list:
- [Rectangles](#rectangles)
- [Lines](#lines)
- [Arcs](#arcs)
- [Bezier Curves](#bezier-curves)
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

- `start(startAngle)` and `end(endAngle)` to set the start and end angles
- `circle()` to make the start angle 0 and end angle Math.PI * 2 and create a circle.
- `radius(radius)` with a radius in pixels
- `diameter(diameter)` with a diameter in pixels (shorthand for `radius / 2`)

## Bezier Curves
This primitive creates cubic bezier curves.

<div class="cc"><div class="example" id="shbz-ex">
    <a target="_blank" class="sclink" href="../editor/?source=../guide/sketches/shapes-bezier.mjs">Look at code</a>
</div></div>

- `controlpts(cp1x, cp1y, cp2x, cp2y)` and `anchorpts(ap1x, ap1y, ap2x, ap2y)` to set the control and anchor points.

The first anchor point is always equal to the position of the primitive.

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