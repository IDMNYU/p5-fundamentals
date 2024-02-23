document.addEventListener("DOMContentLoaded", () => {
  loadSrc = (entries, _) => {
    entries.forEach((entry) => {
      const eEl = entry.target;
      if (entry.isIntersecting && !eEl.getAttribute("src")) {
        eEl.setAttribute("src", eEl.getAttribute("data-src"))
      }
    });
  };

  const observer = new IntersectionObserver(loadSrc, {
    threshold: 0.01,
  });

  const ifs = document.querySelectorAll("iframe[data-src]:not([data-src=''])");
  if (ifs) {
    ifs.forEach((i) => observer.observe(i));
  }
});
