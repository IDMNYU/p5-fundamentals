---
title: Transformers.js
---

The [`ml5` library](../ml5/) and the [Teachable Machine](/../teachable-machine/) projects are the easiest ways to start using AI models in our sketches. They're well documented and maintained, and they provide an easy interface for some of the most common ML tasks.

But, there are other models out there. Lots of them.

Lots of different architectures, different tasks, different libraries....

We can get an idea for the variety of existing open source models by visiting the _models_ section of [Hugging Face](https://huggingface.co/models). Hugging Face is like the GitHub of AI models. It's a platform where companies, researchers, students, anyone can download and upload different AI models.

It's pretty overwhelming and extensive, and not easy to navigate.

One thing that helps is that we can focus on models that run on the browser. A lot of the models on Hugging Face require huge computers and/or huge GPUs to run. Most of them are distributed to be used with libraries written in `Python`, `C` or `Lua`, but there are quite a lot that have been ported to `JavaScript` using a library called [`Transformers.js`](https://huggingface.co/docs/transformers.js/en/index).

## Transformers.js

This is a library written and maintained by the same people who wrote the widely used [transformers](https://huggingface.co/docs/transformers/en/index) library for `Python`. It allows us to download and run models hosted on Hugging Face with an extremely small amount of code.

We can search for `Transformers.js` libraries by clicking on the _lLibraries_ tab and selecting the yellow JS icon (or, follow [this link](https://huggingface.co/models?library=transformers.js&sort=downloads)).

There are over $$1000$$ models available !

Let's start by experimenting with an image description model, found [here](https://huggingface.co/Xenova/vit-gpt2-image-captioning).

The documentation for some of these models is really sparse, but what we have to do is create a `pipeline` object in our sketch, and then process images with this `pipeline` object. Something like this:

```js
model = pipeline("image-to-text", "Xenova/vit-gpt2-image-captioning");
captions = model(image);
```

Easy. But, let's see how to set this up.

## Setup

The first thing we have to do is load the `Transformers.js` library and get access to its `pipeline` object constructor.

Due to choices made by the developers of the `Transformers.js` library, we can't just load it from a `.js` file in our `index.html`, but instead have to dynamically load it during the `preload()` portion of our sketch. We can do this with:

```js
const module = await import("https://cdn.jsdelivr.net/npm/@xenova/transformers");
```

And then the `pipeline` object constructor will be available as `module.pipeline`. Ace.

Now, we just have to instantiate the model with:

```js
model = await pipeline("image-to-text", "Xenova/vit-gpt2-image-captioning");
```

All these `await` keywords ... Good thing we saw those in our [concurrency tutorial](../concurrency/).

{% include p5-editor.html id="z_fQzI1DG" %}

We have our model setup, we just have to start using it.

## Grabbing Images

Let's make our sketch describe what it sees through the webcam.

Even though these `Transformers.js` models are meant to run on the browser with `JavaScript`, they aren't always as optimized as the `ml5` models, so we don't want to run our image description model on every frame of our video stream.

Let's create a button that captures one frame from the video stream as an image, and we'll use that on our model. This way we can control which images get described by the model.

We'll add a video stream to our sketch with:
```js
mCamera = createCapture(VIDEO, { flipped: true }, setupButton);
```

This should look familiar. This time we're using a [callback function](../concurrency/) called `setupButton` to create and place a button that we can use to trigger the image extraction and description process.

For now, when clicked, this button should just grab a frame from the video stream, and do a bit of preprocessing to get it ready for the model. This function grabs the current frame from our camera and turns it into a format that the model understands.
```js
mCamera.canvas.toDataURL();
```

We can display this by turning it back into a `p5.js` image:
```js
mFrame = loadImage(mCamera.canvas.toDataURL());
```

{% include p5-editor.html id="KM8aYkAO-" %}

## Inference

Ok. We're ready to have our image described.

We just need to call the model on the image, and then wait for the result.
```js
let result = await model(mCamera.canvas.toDataURL());
print(result);
```

This will help us navigate the format of the result returned by the model. If we look at `result`, we'll see that what we really want to grab is the text in `result[0].generated_text`. We'll put that in a variable and display it on top of the captured image:

{% include p5-editor.html id="ZuwaVgRID" %}

## More Models

Let's explore our newly developed superpowers of using models from Hugging Face and create a sketch that automatically generate stories based on the contents of our webcam. We'll also run our story through a sentiment analysis model to see what kind of stories our sketch is generating, and to give the story a title.

We need to add some models to our existing sketch. The first one, [llama2-stories110M](https://huggingface.co/Xenova/llama2.c-stories110M), is the story generating model, and the second one, [roberta-emotions](https://huggingface.co/thiagohersan/roberta-base-go_emotions), is the model that will classify our story into one of $$28$$ sentiments.

Let's get started by instantiating our new models:
```js
imgModel = await module.pipeline("image-to-text", "Xenova/vit-gpt2-image-captioning");
strModel = await module.pipeline("text-generation", "Xenova/llama2.c-stories110M");
txtModel = await module.pipeline("sentiment-analysis", "thiagohersan/roberta-base-go_emotions");
```
It takes a bit longer to get started, but that's because we have $$3$$ models to load now.

{% include p5-editor.html id="-e2pGdczT" %}

Now, we have to create variables to hold the results of our story model and of our sentiment analysis model.

First, let's see what they return:
```js
let strResult = await strModel("Once upon a time, there was ");
print(strResult);

let txtResult = await txtModel("Once upon a time, there was an ogre");
print(txtResult);
```

{% include p5-editor.html id="F4FMKgiuI" %}

Ok, we can just get `strResult[0].generated_text` and `txtResult[0].label`. Let's save these in the correct variables and display them on the canvas once they're ready.

We can also extend the length of our story by adding an options object with a `max_new_tokens` key to our inference call:
```js
let strResult = await strModel(caption, { max_new_tokens: 256 });
```

{% include p5-editor.html id="qTC_hvDVF" %}

Now, we're all set to go forth and explore the vast, wonderful, and often poorly-documented, world of Hugging Face transformer image models.

One thing to keep in mind: models that receive _images_ as inputs don't work with `p5.js` image objects, but their `dataUrl` representation. We can get the `dataUrl` for `p5.js` images and video streams using:
```js
mCamera.canvas.toDataURL();
mImage.canvas.toDataURL();
```

## Audio Models

Audio models are a little trickier to use. This is due to two reasons: first, `p5.js` has a very complicated and non-intuitive process for recording audio from the microphone, and second, audio models require their inputs to have very specific audio formats, which `p5.js` doesn't always directly support.

Let's take a look at an audio model called [whisper](https://huggingface.co/Xenova/whisper-tiny.en) that transcribes audio.

We'll start by setting up the audio recording. We need to instantiate three separate objects for this: a microphone stream, a sound recorder and a sound file:
```js
mMic = new p5.AudioIn();
mRecSound = new p5.SoundFile();
mRecorder = new p5.SoundRecorder();
```

Then, we'll need a button that triggers the following code to initialize the browser's audio engine, enable the microphone stream and connect it to the recorder:
```js
mMic.start();
mRecorder.setInput(mMic);
userStartAudio();
```

Now, when we press the record button, we just start recording:
```js
mRecorder.record(mRecSound, 100, captionAudio);
```

The `captionAudio` parameter is a [callback function](../concurrency/) that will be called whenever we stop recording by calling:
```js
mRecorder.stop();
```

The `captionAudio()` function will eventually have to have some code to transcribe our audio.

{% include p5-editor.html id="2DXn3eJYV" %}

Let's add our model to the sketch. This is similar to how we instantiated image models, but with a different option object that specifies the datatype for the samples that will be analyzed:
```js
sttModel = await module.pipeline(
  "automatic-speech-recognition",
  "Xenova/whisper-tiny.en",
  { dtype: "q8" }
);
```

Once we stop recording, we should be able to just call the model on our recorded samples:
```js
let sttResult = await sttModel(mRecSound.buffer.getChannelData(0));
print(sttResult);
```

{% include p5-editor.html id="KkzenTAU5" %}

But, if we look at `sttResult.text`, we'll see that we're getting garbage.

The `mRecSound.buffer.getChannelData(0)` function definitely returns our recorded samples, but, if we print `mRecSound.buffer.sampleRate`, we'll see that our browser likes to record audio at $$44\text{,}100$$ or $$48\text{,}000$$ samples per second, where our model wants to analyze audio recorded at $$16\text{,}00$$ samples per second.

Resampling audio in `JavaScript` isn't easy or fun. Luckily, there's a function called `resample()` included in this sketch that will do just that. It takes $$3$$ arguments: the samples, the original sample rate and the target sample rate, and returns a resampled version of the audio, ready to be analyzed and transcribed by our model:

```js
let samples16k = await resample(
  mRecSound.buffer.getChannelData(0),
  mRecSound.buffer.sampleRate,
  16_000
);
```

Using it before calling our model fixes the sampling issue and now we should be able to get clean transcribed audios:

{% include p5-editor.html id="1VNjI7XFs" %}
