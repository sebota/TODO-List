const element = document.querySelector(".form-button");

element.addEventListener("mousemove", e => {
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--left", `${e.pageX - (rect.left + window.scrollX)}px`);
    element.style.setProperty("--top", `${e.pageY - (rect.top + window.scrollY)}px`);
})