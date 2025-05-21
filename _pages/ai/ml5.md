---
title: ml5
---

The easiest way to get started running AI models in `p5.js` is by using the [`ml5 library`](https://ml5js.org/).

The `ml5` library helps us integrate a number of useful machine learning models into our sketches by providing a common interface for loading and running models for different tasks.

We can load the library into our projects by adding something like this to the header of our `index.html` file:

```html
<script src="https://cdn.jsdelivr.net/npm/ml5@1.2.1/dist/ml5.min.js"></script>
```

Let's say we want to detect faces in an image. We can start with some code that loads an image with faces from an URL:

{% include p5-editor.html id="FhxxKB7-g5" %}

Cool.

Now, we can take a look at the documentation for the [`FaceMesh`](https://docs.ml5js.org/#/reference/facemesh?id=step-by-step-guide) class in `ml5` to see how to instantiate and use a model that not only detects faces and where they are in an image, but also where certain "components" or keypoints of the faces are.

This sketch loads the library and instantiates a `FaceMesh` object with default parameters:

{% include p5-editor.html id="6i0DCr0hUk" %}

In order to actually detect faces we have to call the `detect()` function on an image, like this:

```js
faceMesh.detect(img, callback);
```

Ohhh... _callback_ ! Since detecting faces, or running any kind of ML model, is a time-consuming operation, and we don't want our sketch to freeze while the model runs, we'll generally be using callbacks or `async`/`await` functions. Good thing we just learned about those, [here](../concurrency/).

We can create a `doneDetecting()` _callback_ function to print the results of our detection:

{% include p5-editor.html id="WcVfByzKU" %}

Running the above code, we see that the `detect()` function returns a list of objects that look like this:

```js
{
  box: Object,
  keypoints: Array,
  faceOval: Object,
  leftEye: Object,
  ...
}
```

And, if we poke around the objects in this list we'll start seeing members named: `box`, `lips`, `leftEye`, `faceOval`, etc... which are objects that contain the location of face landmarks or general information about the face detected.

For example, we can draw a box around the face by calling `rect()` with the appropriate values:
```js
rect(box.xMin, box.yMin, box.width, box.height);
```

Or, draw ellipses on the eyes, with:
```js
ellipse(leftEye.centerX, leftEye.centerY, 16);
ellipse(rightEye.centerX, rightEye.centerY, 16);
```

{% include p5-editor.html id="Qy5cK8xwf" %}

## More Faces !

By default, the `FaceMesh` object only detects one face per image. If we want it to detect more we have to give its constructor an object with some parameters:

```js
ml5.faceMesh({ maxFaces: 5 });
```

And now we just have to remember to iterate through the results in the callback function:

{% include p5-editor.html id="Tj7HLq7b9" %}

## Meshes

The `FaceMesh` model is actually good for, well, getting a mesh with all of the points of a given face.

We can see what these meshes look like by iterating through the `keypoints` member of each of the resulting face objects:

{% include p5-editor.html id="-Kp0n6Mfg" %}

## Not Just Pretty Faces

The code that we have so far can easily be extended to work with a video stream instead of static images, and changing the model to another one of the `ml5` models is also very easy.

Let's say we now want to detect hands on images, all we have to do is instantiate a `HandPose` object and make some very minor changes to the code above:

```js
handPose = ml5.handPose({ maxHands: 5 });

// and later ...
handPose.detect(mImg, doneDetecting);
```
And that's it. The rest stays the same:

{% include p5-editor.html id="_PonOkHI3" %}

This model can be super useful for detecting hand gestures or hand signals.

## More Models

In addition to these two models for hands and faces, the `ml5` library also has a model for detecting [body pose](https://docs.ml5js.org/#/reference/bodypose), a model that [classifies](https://docs.ml5js.org/#/reference/sentiment) text as `positive` or `negative`, and models that do [image](https://docs.ml5js.org/#/reference/image-classifier) and [audio](https://docs.ml5js.org/#/reference/sound-classifier) classification based on pre-determined classes.

These last two are limited by the sets of images/sounds that were used during training. The sound classifier only detects the ten digits from _zero_ to _nine_ and the words _up_, _down_, _left_, _right_, _stop_, _go_, _yes_ and _no_.

The image classifier uses a couple of pre-built models, including MobileNetV2, but it doesn't really specify the list of classes that it uses. It might be [this](https://deeplearning.cms.waikato.ac.nz/user-guide/class-maps/IMAGENET/).

If we want to classify other types of images or sounds, we have to train our own models.

Luckily, `ml5` has a way to load models that we can train quickly using something called [Teachable Machine](https://teachablemachine.withgoogle.com/).

Let's take a look at that [next](../tm/).
