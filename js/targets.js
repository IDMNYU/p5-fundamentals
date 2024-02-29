document.addEventListener("DOMContentLoaded", () => {
  Array.from(document.getElementsByTagName("a")).forEach((a) => {
    const a_href = a.getAttribute("href");
    if (!a_href || !a_href.includes("http")) {
      a.setAttribute("target", "_self");
    }
  });
});
