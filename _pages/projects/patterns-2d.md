---
title: 2D Patterns
---

## Prerequisites

This mini-project draws on materials from:

- [Shapes and Colors](../../p5/drawing/)
- [Drawing Patterns](../../p5/patterns/)
- [Loops as Counters](../../p5/counters/)
- [Translations and Transformations](../../creative-coding/transformations/)

## Tiling

We saw how to draw chessboards [here](../../p5/counters/).

What if instead of black and white squares we used the following tiles:

![]({{ '/assets/images/projects/tiles-1x4.jpg' | relative_url }})

The function `quarter()` in the sketch below uses four parameters (`x`, `y`, `width` and `angle`) to draw a tile at position (`x`, `y`) that has a quarter-circle in one of its corners.

{% include p5-editor.html id="iqWU_6Mxb" %}

That is cool, and we can experiment with the angles in this version and use $$0$$ and $$180$$, but this code will only use $$2$$ out of many possible different variations of the pattern.

We can try something that rotates depending on all possible row and column even/odd combinations:
```js
if (col is even && row is even) {
  angle = 0;
} else if (col is even && row is odd) {
  angle = 90;
} else if (col is odd && row is even) {
  angle = 180;
} else if (col is odd && row is odd) {
  angle = 270;
}
```

{% include p5-editor.html id="WXTIQraE-" %}

Or, many other possible combinations of the $$4$$ angles.

Try to change the order of the angles to $$[0, 180, 90, 270]$$ or $$[0, 270, 180, 90]$$.

Or, use repeated angles: $$[90, 180, 90, 270]$$ or $$[0, 180, 180, 90]$$.

Cool, right?!

## One more

Let's use a pattern like this now:
![](https://i.pinimg.com/564x/0c/90/2e/0c902e36c586665f45c57d4ccdd414dd.jpg)

It's made up of a single composite shape, but depending on which column or row it's in, it gets rotated by $$0^\circ$$, $$90^\circ$$, $$180^\circ$$ or $$270^\circ$$.

Without worrying too much about the implementation details, let's say we have a function called `zig()` that draws that shape based on $$4$$ parameters: `x`, `y`, `width` and `angle` of rotation (in degrees):

{% include p5-editor.html id="2IarIAkMf" %}

Again, we can just plug that into our previous chessboard sketch and instead of alternating colors, alternate angle:

{% include p5-editor.html id="MQBh7C_6J" %}

And, again, using all $$4$$ possible combinations of row/column even/odd:

{% include p5-editor.html id="kkJrDDNB8" %}

Change the order of the angles: like $$[0, 180, 90, 270]$$ and $$[0, 270, 180, 90]$$, or, use repeated angles: $$[90, 180, 90, 270]$$ and $$[0, 180, 180, 90]$$.
