---
permalink: /
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
  random
  arrays
  strings
  objects
  advanced-arraying
  classes
{% endcapture %}
{% include home-section.html section="p5" title=title topics=topics %}

<!-- Creative Coding -->
{% assign title = "Creative Coding:The browser as a canvas" %}
{% capture topics %}
  transformations
  interactions
  maths
  animations
  cycles
  sincos
  data
  state
  the-dom
  more-random
  vectors
  images
  videos
  cv
  3d
  sound-files
  sound-processing
  sound-synthesis
{% endcapture %}
{% include home-section.html section="creative-coding" title=title topics=topics %}

<!-- Projects -->
{% assign title = "Mini Projects:Putting it all together" %}
{% capture topics %}
  patterns-2d
  procedural-drawing
  glitchy-typewriter
  simple-game
  sprites
  terrain
  lights
{% endcapture %}
{% include home-section.html section="projects" title=title topics=topics %}
