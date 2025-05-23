---
title: Gemini API
---

Ok. Let's look at even bigger models!

Hugging Face and `Gradio` apps are really good ways to experiment with open source models, but sometimes we might want to look at some of the commercial models, like `chatGPT` or `Gemini`.

The process/code is similar to how we used models through `Gradio` because we'll need to make API requests to servers:

<div class="scaled-images left w75">
  <img src="{{ 'assets/images/ai/gemini-server-00.jpg' |relative_url }}">
</div>

## Gemini

Let's take a look at how to use Google's `Gemini` models to describe images.

We'll start with the plain `Transformers.js` image description sketch we had a few tutorials back:

{% include p5-editor.html id="ZuwaVgRID" %}

Let's remove the `Transformers.js` code and get the sketch ready for a new model:

{% include p5-editor.html id="5oLO0FGaq" %}

We've also added a text input field for pasting a Gemini "_API key_".

What's an _API key_ ? It's how companies keep track of who is using their APIs and services. In this case, it's how Google keeps track of how often we use Gemini and if we're not going over any of the limits of their free tier.

In order to get an _API key_ we have to be logged into a Google account and start an AI Studio project [here](https://aistudio.google.com/). Clicking on the _Get API key_ button and then the _+ Create API key_ button should be enough to start a project and get a key.

<div class="scaled-images left">
  <img src="{{ 'assets/images/ai/gemini-key-00.jpg' |relative_url }}">
</div>

We have to save this key somewhere safe. It's like a password for logging into the Gemini servers.

Now, we can head over to the Gemini API documentation [here](https://ai.google.dev/gemini-api/docs/text-generation#javascript), and see how to add a Gemini client to our `p5.js` sketch.

<div class="scaled-images left">
  <img src="{{ 'assets/images/ai/gemini-api-00.jpg' |relative_url }}">
</div>

Again, we'll have to adapt this to work in a `p5.js` sketch. It's not that bad.

Because we need an API key when creating a `GoogleGenAI` object, we'll just put most of our model code inside the `describeFrame()` function. Even the code that sets up the model.

This way, when we hit the _Describe_ button for the first time, our `gemini` variable will be un-instantiated, and we'll load the library, read the API key value from the text box, and create a `GoogleGenAI` object:
```js
if (!gemini){
  let module = await import(gUrl);
  gemini = new module.GoogleGenAI({ apiKey: apiText.value });
}
```

Here's the code so far. Same as before, but different:

{% include p5-editor.html id="g_Z1QQ5yD" %}

If we dig around the API documentation enough, eventually we'll find [this bit of code](https://ai.google.dev/gemini-api/docs/image-understanding#javascript_1) that describes how to send images to the model.

Again, we have to adapt this to `p5.js`.

The first thing we have to do is make sure our image's `dataURL` is in `jpeg` format, and remove the header that specifies that it's in `jpeg` format:
```js
let imgUrl = mCamera.canvas
  .toDataURL("image/jpeg")
  .replace("data:image/jpeg;base64,", "");
```

Then we can create an image data object:
```js
let imgData = {
  data: imgUrl,
  mimeType: "image/jpeg",
};
```

And, finally, call the model with the image data and a prompt asking it to describe the image:
```js
let response = await gemini.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    { text: "Describe this image" },
    { inlineData: imgData }
  ],
});
```

The description will be in `response.text`.

Now we can run this sketch and get some descriptions from Gemini. We just have to make sure we have our API key in the text box:

{% include p5-editor.html id="D0EjbXv30" %}

## Chatting with Gemini

Chatting with the model is even easier, in terms of the code. It can be exactly the same as above, but we don't need to encode an image:
```js
let response = await gemini.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    { text: "Why is the sky blue?" }
  ],
});
```

Here's a sketch with an extra text box for inputting questions to the model:

{% include p5-editor.html id="FHMs5kya3" %}
