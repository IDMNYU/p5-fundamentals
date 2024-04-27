---
title: Simple Game
---

## Prerequisites

This mini-project draws on materials from:

- [Functions](../../p5/functions/)
- [Randomness](../../p5/random/)
- [Arrays](../../p5/arrays/)
- [Objects](../../p5/objects/)
- [Interactions](../../creative-coding/interactions/)

## NOTE:
Depending on the browser, using the keyboard in our game will also make this page scroll up and down, which is very annoying.

A more pleasant experience is had by opening each example in its own window.

## Main Character

This mini game is inspired by classic games like [Pac-Man](https://en.wikipedia.org/wiki/Pac-Man) and [Snake](https://en.wikipedia.org/wiki/Snake_(1998_video_game)).

We'll have a character that we control and as it moves around the screen it has to collect rewards and avoid obstacles.

Let's start by creating our character and making it move, just like we did when we looked at keyboard [`interactions`](../../creative-coding/interactions/). We'll use the `keyPressed()` function to update our character's `x` and `y` positions.

{% include p5-editor.html id="FTdO6KrG5" %}

Let's give our character continuous motion, so it keeps moving if the keys are held. To do this we can just call `keyPressed()` ourselves in `draw()` whenever any `keyIsPressed`. And since we have continuous movement now we can decrease the `moveDist` amount.

{% include p5-editor.html id="QcWRQqTE3" %}

Better.

## Other Objects

Let's add our reward and obstacle objects. We'll use an array to keep track of each kind of object, and we'll start with $$1$$ obstacle and $$1$$ reward, and add obstacles and rewards as our main character collects rewards.

{% include p5-editor.html id="lU0CYtCUe" %}

## Detecting Overlap

Now, let's add overlap detection so we can tell when our character has collected a reward or touched an obstacle.

We'll use a function that's very similar to the one we saw when we looked at [functions](../../p5/functions/), except this one has been rewritten to receive objects instead of the $$6$$ separate parameters for diameter and `x` and `y` positions:

```js
function overlap(o0, o1) {
  let d = sqrt((o1.x - o0.x) ** 2 + (o1.y - o0.y) ** 2);
  return d < o0.d / 2 + o1.d / 2;
}
```
Now whenever the character overlaps with an obstacle it will decrease in diameter, and whenever it overlaps with a reward it grows. In both cases we remove the object from its array.

{% include p5-editor.html id="oaifEI0NSm" %}

Cool. But boring. Let's add more obstacles and rewards.

Let's make it so that whenever the character hits an obstacle, we'll add $$2$$ new obstacles to the canvas. Let's create a function that adds obstacles:

```js
function addObstacle() {
  let rX = floor(random(mChar.x + mChar.d, mChar.x + width));
  let rY = floor(random(mChar.y + mChar.d, mChar.y + height));

  obstacles.push({
    x: rX % width,
    y: rY % height,
    d: random(maxObstacleDiam / 2, maxObstacleDiam),
  });
}
```

The slightly complex calculations for `rX` and `rY` are to make sure we don't place an obstacle on top of our character. We want a random number that starts after the character's current position, and when wrapped around with the modulo operator (`%`) doesn't go all the way up to the the character's current position.

We can create a similar function for rewards:

```js
function addReward() {
  let rX = random(mChar.x + mChar.d, mChar.x + width);
  let rY = random(mChar.y + mChar.d, mChar.y + height);

  rewards.push({
    x: rX % width,
    y: rY % height,
    d: rewardDiam,
  });
}
```

But, these are so similar that we might as well refactor them into the same function that takes an array and a diameter as parameters:

```js
function addObject(objArray, objDiam) {
  let rX = random(mChar.x + mChar.d, mChar.x + width);
  let rY = random(mChar.y + mChar.d, mChar.y + height);

  objArray.push({
    x: rX % width,
    y: rY % height,
    d: objDiam,
  });
}
```

Now we'll just call this function with the appropriate parameters whenever there's an overlap with rewards or obstacles.

We can also use this function to simplify our `setup()`.

{% include p5-editor.html id="a3hq79Ngk" %}

## More Rewards

As a final adjustment to our game, let's add more rewards.

Whenever the character gets to a reward, we always replace it with a new one, but now let's also add a second reward $$33\%$$ of the time, and a third reward $$12\%$$ of the time.

```js
if (rewards.length < maxRewardCount) {
  if (random() < 0.3333) {
    addObject(rewards, rewardDiam);
  }
  if (random() < 0.12) {
    addObject(rewards, rewardDiam);
  }
}
```

{% include p5-editor.html id="v6V7-ncnS" %}
