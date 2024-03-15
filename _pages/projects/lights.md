---
title: Light Sources
---
## Prerequisites

This mini-project draws on materials from:

- [Shapes and Colors](../../p5/drawing/)
- [Classes](../../creative-coding/animation/)
- [Math](../../p5/math/)
- [Classes](../../p5/classes/)
- [Animation](../../creative-coding/animation/)
- [Sine & Cosine](../../creative-coding/sincos/)
- [Trigonometry and Vectors](../../creative-coding/trigonometry/)

## Point Sources


## Points and Lines

While not as common, sometimes we might want to calculate the distance between a point and a line.

This is the shortest distance from a given point to any point on an infinite straight line. It is the perpendicular distance of the point to the line, or, the length of the line segment which joins the point to nearest point on the line.

It's the distance $$d$$ between $$(X, Y)$$ and the line $$y = \frac{m}{n}x + b$$ on the drawing below:

<div class="scaled-images left s75">
  <img src = "{{ '/assets/images/projects/lights-00.jpg' | relative_url }}"/>
</div>

There are many ways to derive the equation for the distance. The one in the drawing involves using distances from another point $$(X_0, Y_0)$$, also on the line, to the original point and to a point $$(X_0+m, Y_0-n)$$ that is perpendicular to the line. The final distance equation is:

$$d = \frac{\left|mX - nY + bn\right|}{\sqrt{m^2 + n^2}}$$

Again, the details of how this is derived are not super important. We should just know that it can be calculated, and that the equation is here on this page whenever we need it.

We can use it do create a kind of light saber, color diffusion, effect by calculating color values for every point in our canvas based on how far they are from a line. Since doing this for every single pixel would be too much work for our browsers, let's work with a canvas that's divided into 32 x 32 squares:

{% include p5-editor.html id="Q2mlRpMIo" %}


## Distance to Lines

To calculate the distance to a line, the code remains mostly the same, and it looks just as complicated, but in reality it uses some of the properties of vectors to make the calculation a little more geometric instead of algebraic, which can help remember how to derive the formula at a later time.

Again, don't worry about the details for this one, just know where it it and how to use it.

We first define a line object with parameters for its equation in the form: $$y = mx + b$$. We then use these parameters to create a vector that is perpendicular to this line, so we can project our original vector onto this perpendicular vector.

And just like that, we get the distance.

{% include p5-editor.html id="mqShzRx7C" %}

---
Now that we know about classes, we can even create a class for the line with equation $$y = mx+b$$ and keep all of the math for calculating distances inside the class:

{% include p5-editor.html id="YI2E4ithx" %}

This is one of the great things about classes: once we have the math for something figured out, we can always wrap it inside a class that will use it to update an object's shape, color, position, etc, and then we can have $$10$$ or $$100$$ of these objects by just creating new instances from our class definition.

For example, we can move the color info inside our object, call it a Light class and use it to create a couple of lights in our canvas:

{% include p5-editor.html id="DSmK_Y5pK" %}

And now automate some slope changes over time, sit back and enjoy a low-fi, pixel light show:

{% include p5-editor.html id="EjqQv0gjl" %}
