---
title: More Randomness
---
We've already seen how to generate continuous [random numbers](../../p5/random/) within a range, and also how to use those numbers to pick values from a pre-determined set of options.

Just to review, let's use `random()` to generate a grid of ellipses with different, unpredictable, diameters:

{% include p5-editor.html id="nqcZuTl9E" %}

We're using `random(0.2 * gridW, 0.8 * gridW)` to pick random ellipse diameters between $$20\%$$ and $$80\%$$ of the value of the grid width.

## Uniform
The `random()` function gives us uniformly distributed values: any value between its `min` and `max` parameters are equally likely to occur.

We can visually this in a couple of ways.

In one-dimension, using a random variable to set the diameter of ellipses. All values between $$0$$ and `width` are equally likely:

{% include p5-editor.html id="OwwacY5KB" %}

In two-dimensions, using random variables to pick `x` and `y` positions for ellipses. All positions on the canvas are equally likely:

{% include p5-editor.html id="qcwQ-Q_iy" %}

Uniform random variables are strongly related to choice events like rolling a die, picking a card from a deck, or thinking of a number between $$0$$ and $$100$$.

This isn't the only way randomness occurs. If we look at values for people's heights, shoe sizes and blood pressure, or even something like subway occupancy throughout the day, we'll see that even though exact values are not predictable, they tend to have a non-uniform distribution where certain values are more likely to occur.

## Normal Gaussians
These are examples of variables that follow a [*normal distribution*](https://en.wikipedia.org/wiki/Normal_distribution) (sometimes also called a Gaussian distribution). This might sound familiar from algebra or statistics class, but just to review: in a normal distribution, not all numbers are equally likely to occur; the distribution has a specific "expected value" and a "spread".

The "expected value" is the average, or mean, value of the distribution. If we sample a bunch of numbers from a normally distributed event, and take the average of those values, we should get this number. We would also expect half of the numbers in this distribution to be larger than the mean, and the other half to be smaller.

The "spread" of a distribution is officially called a standard deviation, and it specifies how likely numbers far from the mean are to occur. This plot shows the relationship between mean and standard deviation for a gaussian distribution with mean $$0$$ and standard deviation $$\sigma$$:

<div class="scaled-images s75">
  <img src = "{{ '/assets/images/creative-coding/gaussian-00.jpg' | relative_url }}"/>
</div>

What this graph shows is that about $$68\%$$ of the values chosen from a gaussian distribution will be within $$1$$ standard deviation from the mean, about $$95\%$$ will be within $$2$$ standard deviations, and almost all of the values ($$99.7\%$$ of them) will be within $$3$$ standard deviations from the mean.

We can check this with the p5js [`randomGaussian()`](https://p5js.org/reference/#/p5/randomGaussian) function.

Let's use it to repeat the same $$2$$ visualizations we used for the `random()` function above.

In one-dimension, let's use $$0$$ for the mean and $$\frac{width}{3}$$ for the standard deviation. This should make it so that most of the ellipses fall within the canvas:

{% include p5-editor.html id="0RF_McaiH" %}

In two-dimensions, we want our ellipses to be clustered around the center and mostly stay within the canvas. This makes our means $$\frac{width}{2}$$ and $$\frac{height}{2}$$, and standard deviations $$\frac{width}{6}$$ and $$\frac{height}{6}$$.

{% include p5-editor.html id="p0VBk3vqq" %}

We can even plot some markers at $$1$$, $$2$$ and $$3$$ standard deviations to check that the values returned by the `randomGaussian()` function follow the expected $$68\%$$, $$95\%$$ and $$99.7\%$$ distribution.

{% include p5-editor.html id="8as0gBfqU" %}

{% include p5-editor.html id="vpYlh8--H" %}

And let's see what happens if we use a gaussian distribution to pick ellipse diameters for our grid pattern. Let's try $$\frac{gridW}{4}$$ for the mean and $$\frac{gridW}{3}$$ for the standard deviation.

{% include p5-editor.html id="GPw3zcXJV" %}

## Noise

Uniform and gaussian distributions aren't the only way of creating random variables.
