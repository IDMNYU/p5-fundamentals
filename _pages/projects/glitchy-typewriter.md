---
title: Glitchy Typewriter
---

## Prerequisites

This mini-project draws on materials from:

- [Shapes and Colors](../../p5/drawing/)
- [Loops as Counters](../../p5/counters/)
- [Random](../../p5/random/)
- [Maths](../../p5/maths/)
- [Arrays](../../p5/arrays/)
- [Strings](../../p5/strings/)
- [Classes](../../p5/classes/)
- [Animations](../../creative-coding/animations/)

## Typing

In this mini-project we are going use classes to implement a kind of glitchy and fading typewriter effect for displaying text.

We have a phrase and we want to repeatedly write it on our canvas, one letter at a time:

<div class="scaled-images w75">
  <img src = "{{ '/assets/images/projects/all_work_and_no_play.jpg' | relative_url }}"/>
</div>

Since strings are just arrays of letters, we can have a global variable for a counter, and use it to keep track of how many of the characters to draw at each frame. As the counter goes up, we'll draw more letter, and the effect will be something like a typewriter:

{% include p5-editor.html id="eTPlwFKzC" %}

We are using the array's [`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) member function to copy over a portion (or slice) of the full array. The parameters to `slice()` specify the starting index and the end index of our slice.
```js
let phraseToDraw = phrase.slice(0, currentMaxIndex);
```

As `currentMaxIndex` goes up, the slice that gets copied into our `phraseToDraw` string grows one letter at a time.

Once all of the letters have been included in our `phraseToDraw` string we have a choice to make: we can stop and keep `currentMaxIndex` set to `phrase.length`, or we can wraparound and reset `currentMaxIndex` to $$0$$ andd start over.

Both options are in the code. Try them out and make sure they make sense.

One aspect of this code that we can improve is the speed at which the letters come in. Right now they come in as fast as our frame rate, $$30$$ to $$60$$ letters per second.

Let's add another global variable that will keep track of when to update the index. That way we can not only slow down our typewriter, but also add a little variation to each delay, so it feels a bit more like a person typing. We'll use the `millis()` function to keep track of time in our code:

{% include p5-editor.html id="kPz4Lv3gw" %}

Now, `nextUpdateMillis` holds the value of the next index update, and if `millis()` goes past this value, it means it's time to update the index along with the `nextUpdateMillis` variable.

## Add Repeat

This is not bad, but we are not repeating our phrase over and over like [Jack](https://www.youtube.com/watch?v=4lQ_MjU4QHw&t=12s). It just stops, or starts again at the top.

First, let's break the phrase up into words:
```js
words = phrase.split(" ");
```

And instead of keeping a counter for which letter in the phrase to draw, we'll keep a counter called `wordCount` that tells us how many words to draw.

This way we can control where each word gets placed, and restart the phrase over at the right place and time:

{% include p5-editor.html id="JBypcfU7E" %}

Our logic got a bit more complex, since now we have to calculate where to place each word.

At the start of a frame, `cx` and `cy` get initialized to the location of the very first word. As we iterate over our `wordCount`, we pick words from the `words` array, being careful to wrap around to the beginning with the help of modulus ($$\%$$) whenever `wordCount` becomes greater than `words.length`.

Once we know which word to draw next, we check to see if it will overflow the current line:
```js
if(cx + textWidth(nextWord) > width - MARGIN)
```

If the current $$x$$ location plus the width of the word is beyond our margin at<br>`width - MARGIN`, then we have to wraparound and start a new line by resetting `cx` and incrementing `cy` by the number of pixels we want our line height to have:
```js
cx = MARGIN;
cy += 1.5 * textSize();
```

And, finally, after we draw the word we update `cx` to include the word's length plus the width of a space (" ").

The whole time we are also keeping track of `nextUpdateMillis` so we can control how fast new words get added to the canvas.

In addition to checking if it's time to update, we now also check if `cy` is still within the canvas. If it is within the canvas and it's time to update, we increment `wordCount`, but once `cy` goes beyond the canvas height, we can stop incrementing `wordCount`:
```js
if (cy < height && millis() > nextUpdateMillis)
```

## Adding Glitch

We are not drawing one letter at a time like a typewriter, but now that we are drawing one word at a time we can add some effects to our typewriter.

We can highlight certain words using color, size and font changes. We could use something like this to detect the word *glitch*:
```js
if (nextWord == "glitch")
```

But, what if the word is capitalized? Our code will be more robust if instead of checking for the whole word we just check if the string contains a sub-string using [`includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes):
```js
if (nextWord.includes("litch"))
```

Thinking about it now \... what if the whole word is already written in uppercase letters? We could do something like this to guarantee detection under any combination of capital and lowercase letters:
```js
if (nextWord.toLowerCase() == "glitch")
```

In addition to the word "*glitch*" we can also highlight random words [probabilistically]({{ site.baseurl }}/tutorial/random-lottery/), almost like there was a glitch in our algorithm:
```js
if (nextWord.includes("litch") || random() > 0.95)
```

{% include p5-editor.html id="HgH7d2lPT" %}

There are some extra variables now to help switch between the two styles of text, but the overall logic of when and where to display the words is the same.

## More Glitch
*It's still not a typewriter*.

Ok... ok... but before we get back to that, let's have some more fun adding effects to what we have.

Let's make the words fade out and add logic to reset `cy` once it gets to the bottom, so we can have an infinite typewriter that keeps writing the same phrase over and over and over again on the canvas.

To make the `cy` counter start over when we get to the end of the canvas is simple, we just have to check:
```js
if (cy > height - MARGIN) {
  cy = MARGIN;
}
```

{% include p5-editor.html id="XwEXW_cxq" %}

Adding fadeout is a bit more complicated. There might be a way to use `map()` to map the `wi` word index into alpha values, but it's not very intuitive and the logic can end up looking messy and hard to understand.

We can see how adding a class or at least an array here would help.

We are going to use an array that holds alpha values for each word that we add to the screen. This is different from every word in our phrase, since the phrase can repeat. Our array of alpha values has to always have a length of `wordCount`, so we will push a $$255$$ into it every time we increment that counter.

Now at every frame, before we draw anything, we can go through the array of alpha values and decrement them by some predetermined `fadeVelocity`:

{% include p5-editor.html id="s7AyQcjQr" %}

This looks good, but, besides the fact that it's not a typewriter, we have another issue to consider.

If we were to print the size of our `alphaValues` array we would see that it keeps growing and growing. Even after the alpha values have gone to $$0$$ we 'll keep those values in the array, and more, we'll keep drawing the words related to those alpha values, but invisibly.

This is partly due to how we chose to keep track of `cx` and `cy`. We need to draw those invisible words in order to have the visible ones come out in the right places.

## Typewriting
Back to the typewriter. And hopefully we can fix the other inefficiency at the same time.

There are many ways to add logic here to make our words draw out one letter at a time. We might be able to add a nested `for()` loop into our `wordCount` loop, but that would require us to keep two timers, one for the words, and another for the letters, and the logic would just get out of hand inside our `draw()` function.

This is a perfect opportunity to try to encapsulate this logic into a class that will hold a word, define all of its properties and keep its own timer for drawing its letters.

Trying to keep the logic the same, while moving the properties that are particular to each word into a class, we end up with this:

{% include p5-editor.html id="WJsh4bECM" %}

We added a lot of code here. Let's take some time to look over all of the code.

The `FadingWord` class is responsible for keeping track of its own x and y location, as well as the style in which to draw its word to the canvas.

Instead of an array for alpha values, we now have an array called `drawnWord` for keeping `FadingWord` objects.

We still need to keep a `wordCount`, so we know which word in the phrase will be added to the array next.

And we still need `cx` and `cy` to keep track of where the next word goes in the canvas, even though now that doesn't happen when we draw the word, but when we create a new `FadingWord` object and push it into the `drawnWords` array.

Before we start implementing the letters, let's move some of the draw code into the class and get fading to work again:

{% include p5-editor.html id="n-z5MTf3O" %}

We now have an `update()` function for decrementing each word's alpha value each frame, and a `draw()` function for drawing the word. The red and black words have slightly different fade velocities, so the red words stay on screen a bit longer.

We can now also use a function to filter and remove `FadingWord` objects that aren't being drawn anymore (`this.alpha == 0`):
```js
function isVisible(fw) {
  return fw.alpha > 0;
}
```

And in `draw()`:
```js
drawnWords = drawnWords.filter(isVisible);
```

## One More Fix
Almost there...

If we increase the probability of the red words in the code above we'll see a small bug in our logic:

<div class="image-row image-row-ugly">
  <div class="img-wrapper">
    <img src = "{{ '/assets/images/projects/glitchy-typewriter-00.jpg' | relative_url }}"/>
  </div>
  <div class="img-wrapper">
    <img src = "{{ '/assets/images/projects/glitchy-typewriter-01.jpg' | relative_url }}"/>
  </div>
  <div class="img-wrapper">
    <img src = "{{ '/assets/images/projects/glitchy-typewriter-02.jpg' | relative_url }}"/>
  </div>
</div>

Sometimes the red words overflow and get drawn too close to the right edge.

This is happening because the overflow check on line $$99$$ of our code is done with the smaller font size before the `FadingWord` object is even created, so it doesn't know whether it's a red or black word.

Let's move the `cx` and `cy` logic to the class. Every time a new `FadingWord` is created it can update the `cx` and `cy` variables:

{% include p5-editor.html id="7o1dUp50h" %}

This is a lot better. There are still some improvements we could make, but now the `setup()` and `draw()` functions in our `FadingWord` class are clean and work as we expected:

<div class="image-row image-row-good">
  <div class="img-wrapper">
    <img src = "{{ '/assets/images/projects/glitchy-typewriter-03.jpg' | relative_url }}"/>
  </div>
  <div class="img-wrapper">
    <img src = "{{ '/assets/images/projects/glitchy-typewriter-04.jpg' | relative_url }}"/>
  </div>
  <div class="img-wrapper">
    <img src = "{{ '/assets/images/projects/glitchy-typewriter-05.jpg' | relative_url }}"/>
  </div>
</div>

## Back To The Typewriter

For real now.

One way to implement this is to add a couple of variables to our `FadingWord` class to keep track of time. This is kind of like in our original implementation where we had a variable that would let us know when it was time to add a letter to our string slice:
```js
this.startTime = millis();
this.letterDelay = _wordDelay / this.word.length;
```

`startTime` remembers the time this `FadingWord` was created and `letterDelay` holds how much delay we will have between letters in this word. It's calculated based on the word length and the total time this word has to type itself before the next word starts showing up.

When it's time to draw we do:
```js
let elapsed = millis() - this.startTime;
let lastLetter = min(floor(elapsed / this.letterDelay), this.word.length);
let letters = this.word.slice(0, lastLetter);
```

`elapsed` is how much time has passed since we created this word.<br>`elapsed / this.letterDelay` gives the index of the last letter that should be typed by now. Like every time we are dealing with array indices, we use `floor()` to guarantee that the value is a whole number and not a fractional value.

Since `elapsed` is gonna keep growing and growing, but we only have `this.word.length` letters, we use `min()` to make sure we stop incrementing `lastLetter` once we get to the end of the word.

The `letters` variable holds the slice of the word that will be passed to `text()`.

Just a little adjustment in the `draw()` function because now we want the new `FadingWord` object and the `nextUpdateMillis` variable to use the same `wordDelay` for the new word.

Well, a very similar delay. It get's scaled by $$1.2$$ when calculating `nextUpdateMillis` so there's a tiny bit of a pause between finishing a word and starting the new one:
```js
let wordDelay = random(450, 600);
drawnWords.push(new FadingWord(nextWord, wordDelay));

// next update time in millis, with some variation
nextUpdateMillis = millis() + 1.2 * wordDelay;
```

{% include p5-editor.html id="KJO5CEwKM" %}

<script src="{{ '/assets/simplelightbox/simple-lightbox.min.js' | relative_url }}"></script>
<script src="{{ '/js/lightbox.js' | relative_url }}"></script>
