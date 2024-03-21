---
title: Git and GitHub
---
## Version Control

Along with a good IDE, another tool that is indispensable for working with code is a version control system.

A version control system is crucial when we start working on larger and larger projects with larger and larger teams, but they are very helpful even when we are working alone on homeworks and projects.

They prevent us from ending up in this situation:
<div class="scaled-images left w100">
  <img src="{{ '/assets/images/intro/git-00.jpg' | relative_url }}">
</div>

They do this by keeping track of all of the changes in our files, and providing mechanisms for us to go back in time to any version of our code that was saved in its history.

<div class="scaled-images left w75">
  <img src="{{ '/assets/images/intro/git-01.jpg' | relative_url }}">
</div>

It gives us another level of *saving* for our files. One that not only allows us to later see what was added, removed or modified in each of our files, but also when, and by whom. It also has ways of letting us group changes that we make in different files, so we can better track how different parts of a project are related.

We can definitely use a version control system by ourselves to keep track of our changes on our files, but if we're working on a project with someone else who is also using a version control system on their computer, we can use version control to synchronize the changes that we make on the shared files.

<div class="scaled-images left w75">
  <img src="{{ '/assets/images/intro/git-02.jpg' | relative_url }}">
</div>

A version control system also helps us track different versions of our code. Not only can we always go back to some point in the past history of our code, we can also *branch* our history and keep parallel versions of our files.

This can be very useful when we're experimenting and testing different strategies and methods for implementing an algorithm or procedure. A version control system will help us switch between these versions without losing any information.

<div class="scaled-images left w75">
  <img src="{{ '/assets/images/intro/git-03.jpg' | relative_url }}">
</div>

## Git

The most popular, robust, social and featureful version control system today is called [`git`](https://git-scm.com/):

<div class="scaled-images left w75">
  <img src="https://cdn.stackoverflow.co/images/jo7n4k8s/production/c52f86a87dfbcaa1bf9674c6e9ca55f7bb446afe-890x188.png">
</div>

It's what most companies, teams and individuals use, not only for code, but more and more often, for many kinds of text-based files. It's popularity is probably not unrelated to the popularity of GitHub, the cloud-based, social-network/hosting-service web platform for `git` projects, but we'll get to GitHub next.

Let's start by looking at just `git`, the version control software, as it runs on our local machines.

Most Macs and Linux computers come with a version of `git` installed. For computers that don't have `git`, it can be downloaded and installed from the official `git` [website](https://git-scm.com/downloads). This is the classic method of installing `git`, which allows us to use it through text commands in a terminal, without a graphical user interface.

The easiest way to install, and easiest way to get started with `git`, is by using the [GitHub Desktop App](https://desktop.github.com/). And since we will eventually want to upload our projects to the web, this is also the easiest way to connect our local project files to the GitHub service.

This video quickly goes over how to download and install the App on a Mac:

<div class="video-container w100">
  <video class="video" playsinline autoplay muted loop>
    <source src="{{ '/assets/images/intro/git-video-00.webm' | relative_url }}" type="video/webm">
    <source src="{{ '/assets/images/intro/git-video-00.mp4' | relative_url }}" type="video/mp4">
  </video>
</div>

## Basic Workflow

Now that we have `git` installed, let's go over how to set up and use it in a project.

First, let's use our computer's file manager to create an empty directory for our project, and then let's add this directory to our *IDE*:

<div class="video-container w100">
  <video class="video" playsinline autoplay muted loop>
    <source src="{{ '/assets/images/intro/git-video-01.webm' | relative_url }}" type="video/webm">
    <source src="{{ '/assets/images/intro/git-video-01.mp4' | relative_url }}" type="video/mp4">
  </video>
</div>

Next, let's add two files to our project, one called `index.html` and another called `sketch.js`, and start working on our project:

<div class="video-container w100">
  <video class="video" playsinline autoplay muted loop>
    <source src="{{ '/assets/images/intro/git-video-02.webm' | relative_url }}" type="video/webm">
    <source src="{{ '/assets/images/intro/git-video-02.mp4' | relative_url }}" type="video/mp4">
  </video>
</div>

The exact content of these files is not very important right now. We just want something we can add to version control. We could just as well have started with some project that we already had in our computer.

Now, let's switch to the GitHub app to *initialize* our *repository*. *Repository* is just a fancy word for our folder/directory/project once it gets added to version control. One thing to note: when selecting the `Local Path` for our repository we want to select the parent directory of our existing project and NOT our project's directory. In our example we selected the `Creative-Coding` folder and not the `HW01` folder.

Once the app initializes our repository it also automatically adds and *commits* both of our files (`index.html` and `sketch.js`) to the version control history. A *commit* is a set of changes that get recorded permanently in our repository's history.

If we select the *commit* and look at the content of the files, all of their lines will be shaded green, meaning those were new lines added to our repository history:

<div class="video-container w100">
  <video class="video" playsinline autoplay muted loop>
    <source src="{{ '/assets/images/intro/git-video-03.webm' | relative_url }}" type="video/webm">
    <source src="{{ '/assets/images/intro/git-video-03.mp4' | relative_url }}" type="video/mp4">
  </video>
</div>

If we now make changes to our files, we'll see that both our IDE and the GitHub App notice those changes. The IDE will add vertical marks along the side of the modified lines of our code, and the GitHub App will list our file and highlight its modifications, under the `Changes` tab.

It again highlights in green the lines that have been added, and now it also highlights in red the empty line that was "removed" when we added the new code.

We can add these changes to our repository's permanent history by writing a little note with the description of the changes in the textbox towards the bottom-left of the app, and hitting the `Commit to main` button.

If we now check the history we'll see that we have a new commit, that shows exactly what we changed:

<div class="video-container w100">
  <video class="video" playsinline autoplay muted loop>
    <source src="{{ '/assets/images/intro/git-video-04.webm' | relative_url }}" type="video/webm">
    <source src="{{ '/assets/images/intro/git-video-04.mp4' | relative_url }}" type="video/mp4">
  </video>
</div>

If we make a mistake and create a commit before we meant to, or if we accidentally add the wrong code to a commit, we can always *undo* the last commit. This will restore our code to whatever it was right before the commit, allowing us to go back into our IDE to fix anything before updating the commit message (if necessary) and re-committing:


{% comment %} <!--
## References
- [W3Schools](https://www.w3schools.com/git/git_intro.asp?remote=github)
- [GitHub](https://docs.github.com/en/get-started/start-your-journey/about-github-and-git)


## 📚  Resources
- [A short video explaining what GitHub is](https://www.youtube.com/watch?v=w3jLJU7DT5E&feature=youtu.be)
- [Git and GitHub learning resources](https://docs.github.com/en/github/getting-started-with-github/git-and-github-learning-resources)
- [Interactive Git training materials](https://githubtraining.github.io/training-manual/#/01_getting_ready_for_class)
- [GitHub's Learning Lab](https://lab.github.com/)

--> {% endcomment %}
