---
permalink: /
title: "p5-fundamentals | Basics of working with p5js at IDM"
---
<!-- Intro -->
{% assign title = "Intro:Some basic concepts related to programming" %}
{% capture topics %}
  programming
  javascript
  ide
  git
{% endcapture %}
{% include home-section.html section="intro" title=title topics=topics %}

<!-- P5 -->
{% assign title = "Ready to p5:The basics of programming using p5.js and JavaScript" %}
{% capture topics %}
  p5-setup
  p5-intro
  drawing
  variables
  conditionals
  patterns
  counters
  functions
  arrays
  strings
  objects
  data
  classes
{% endcapture %}
{% include home-section.html section="p5" title=title topics=topics %}

<!-- Creative Coding -->
{% assign title = "Creative Coding:The browser as a canvas" %}
{% capture topics %}
  transforms
  interaction
  animation
  state
  random
  math
  cycles
  sincos
  vectors
  images
  video
  cv
  sound
{% endcapture %}
{% include home-section.html section="creative-coding" title=title topics=topics %}

<!-- Projects -->
{% assign title = "Mini Projects:Putting it all together" %}
{% capture topics %}
  patterns-2d
  procedural-drawing
{% endcapture %}
{% include home-section.html section="projects" title=title topics=topics %}
