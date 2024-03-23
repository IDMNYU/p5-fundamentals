---
title: Sprites
---
## Prerequisites

This mini-project draws on materials from:

- [Shapes and Colors](../../p5/drawing/)
- [Conditionals](../../p5/conditionals/)
- [Arrays](../../p5/arrays/)
- [Classes](../../p5/classes/)
- [Interactions](../../creative-coding/interactions/)
- [Animations](../../creative-coding/animations/)
- [State Variables](../../creative-coding/state/)
- [Images](../../creative-coding/images/)

## Animated Characters
In this mini-project we are going to define a class that will help us work with sequences of images.

This is kind of like how an animated GIF works, and also very much like how 2D video game [sprites](https://en.wikipedia.org/wiki/Sprite_(computer_graphics)) work.

We will design the class in a way that will make it easier to turn it into a video game character later.

## Image Sequences
Let's start by loading a sequence of images and taking a look at them.

The `spriteInfo` object holds information about the images that we've downloaded/created, and an empty array to hold `Image` objects once we load them:

{% include p5-editor.html id="pxkpF7p1B" %}

So, the idea is that we want to draw these one after the other, at the same location on scree, with a certain delay between them.

Let's create a class that receives a list of images and $$(x, y)$$ positions as parameters to its constructor. It also has a `draw()` function to draw the image to the canvas:

{% include p5-editor.html id="-URXG3qyl" %}

Easy. Just a few things to note:

In the `draw()` function:
```js
let currentIndex = 0;
let currentImg = this.imgs[currentIndex];
```

These keep track of the current index that should be displayed at any given frame. Right now it's fixed at $$0$$, but it will be updated at every frame to determine which image from the array should be displayed.

Let's think about that for a bit.

We don't want our index to increment every frame, that would make the animation too frantic. We probably want our index to increase by one every $$100$$ milliseconds or so. One way to achieve this is to have variables that keep track of the current index and the last time when the index was updated, and then after $$100$$ milliseconds have passed, update the index.

In the constructor:
```js
if (millis() > this.lastUpdate + this.delay) {
  this.currentIndex += 1;

  if (this.currentIndex >= this.imgs.length) {
    this.currentIndex = 0;
  }
  this.lastUpdate = millis();
}
```

And that's it, we have a simple animated sprite:
{% include p5-editor.html id="V0LWITpih" %}

Let's optimize the code a little bit before we continue.

The `currentIndex` logic works, but it's really long. What we want is to increment the index, and when it gets to the last index, start again in the beginning. That sounds like a modulo operation, and all those lines of code above can be simplified to:
```js
if (millis() > this.lastUpdate + this.delay) {
  this.currentIndex = (this.currentIndex + 1) % this.imgs.length;
  this.lastUpdate = millis();
}
```

Same result, but the code is easier to read.

Let's take advantage of our class and instantiate multiple animations.

We're gonna turn `mGif` into an array to store our `Gif` class objects, and use `mouseClicked()` to push new `Gif`s into this array:

{% include p5-editor.html id="_98mxD0hq" %}

Very cool, but they get drawn on top of each other in a very crude way. Let's sort the array by $$y$$ position every time we add a new Gif to our array. This way we will draw the characters towards the top of the canvas first, and it will give our canvas a bit of perspective:

{% include p5-editor.html id="ql967lz1m" %}

While we're at it, let's add another type of character that can be drawn. We'll turn `spriteInfo` into an array of objects to keep info about the different sprites:
```js
let spriteInfo = [
  { name: "princess-muscles", imgCount: 6, imgs: [] },
  { name: "ice-king", imgCount: 6, imgs: [] },
];
```

In the setup we'll iterate over this array to create the image arrays, and in the `mouseClicked()` we'll pick a character type randomly:

{% include p5-editor.html id="RsomgsURQ" %}

## Moving Animated Characters
If we look at the code above, the code inside our `setup()`, `draw()` and `mouseClicked()` functions is extremely simple. We were able to put the messy logic for counting frames and updating image indexes inside our class. Once that is working we can forget about it and just instantiate and use our characters.

Let's take advantage of this *abstraction* and add code to our project to draw characters that move around the screen and use different sprites depending on the direction they are moving.

We will use the same data structure to load our images, but now, instead of different characters it's different directions of movement:
```js
let spriteInfo = [
  { direction: "down", imgCount: 6, imgs: [] },
  { direction: "side", imgCount: 6, imgs: [] },
  { direction: "up", imgCount: 6, imgs: [] },
];
```

And we don't need an array for multiple Gifs because for now we only have one character.

{% include p5-editor.html id="7XUYT6-Do" %}

Now, we have to add some code in order to draw different sequences of images depending on direction of movement.

First, we need to pass the whole `spriteInfo` array to our `Character` class object.

We also need some variables to keep track of which image sequence is being drawn:
```js
this.imgInfo = _imgInfo;
this.currentImgs = this.imgInfo[0].imgs;
```

We'll start with the "down" image:

{% include p5-editor.html id="XV7zOvlzU" %}

Now we can add the code for detecting key presses and updating `this.currentImgs` and the position of our character. We can check if any keys are pressed during our `draw()` function and update image arrays and positions accordingly.

We are using this function to iterate over the data in  `imgInfo` and find the array of images that corresponds to our direction of travel:
```js
getDirectionImgs(dir) {
  for(let i = 0; i < this.imgInfo.length; i++) {
    if(this.imgInfo[i].direction == dir) {
      return this.imgInfo[i].imgs;
    }
  }
}
```

Almost there. This works, but the left and right movements are using the same sequence of images:

{% include p5-editor.html id="iD9rPic5I" %}

Since the right and left movements are symmetrical, we only store one of the sequences in order to save storage space.

We just have to detect left arrow key presses and then in `draw()` flip the image ourselves:
```js
if(this.flipX) {
  scale(-1, 1);
  translate(-currentImg.width, 0);
}
```

That's how we flip an image across the vertical axis: we scale by $$-1$$ in the x-direction and then move the image back to the right, so it's in the same place as it was before the flip.

{% include p5-editor.html id="fliazTkAh" %}

And now we have our hero character!
