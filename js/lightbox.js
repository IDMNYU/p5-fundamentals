const lbOptions = {
  sourceAttr: "src",
  overlayOpacity: 0.8,
  showCounter: false,
  loop: false,
};

window.addEventListener("DOMContentLoaded", (_) => {
  const gClass = "image-row";
  const gEls = Array.from(document.getElementsByClassName(gClass));
  const galleries = new Set();

  gEls.forEach((el) => {
    const elClasses = Array.from(el.classList);
    const gClasses = elClasses.filter(
      (c) => c.startsWith(gClass) && c != gClass
    );

    if (gClasses.length > 0) {
      galleries.add(gClasses[0]);
    }
  });

  if (galleries.size < 1) {
    galleries.add(gClass);
  }

  galleries.forEach((g) => new SimpleLightbox(`.${g} img`, lbOptions));
});
