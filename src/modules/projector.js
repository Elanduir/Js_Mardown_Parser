export { projectHTML };

const projectHTML = (id, html) => {
    const element = document.getElementById(id);
    element.innerHTML = html;
}