document.addEventListener("DOMContentLoaded", () => {
  Array.from(document.getElementsByTagName("a")).forEach((a) => {
    if (!a.getAttribute("href").includes("http")) {
      a.setAttribute("target", "_self");
    }
  });
});
