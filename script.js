(function () {
    let scale = 1;

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "rgba(0,0,0,0.95)";
    overlay.style.display = "none";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";
    overlay.style.cursor = "zoom-out";

    const img = document.createElement("img");
    img.style.maxWidth = "100vw";
    img.style.maxHeight = "100vh";
    img.style.objectFit = "contain";
    img.style.transformOrigin = "center center";
    img.style.cursor = "zoom-out";

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    // Open image on click
    Array.from(document.querySelectorAll("img"))
        .filter(i => !i.classList.contains("icon")
             && !i.classList.contains("icon-small"))
        .forEach(i => {
            i.style.cursor = "zoom-in";
            i.addEventListener("click", function (e) {
                e.stopPropagation();
                scale = 1;
                img.style.transform = "scale(1)";
                img.src = this.src;
                overlay.style.display = "flex";
            });
        });

    // Scroll to zoom
    overlay.addEventListener("wheel", function (e) {
        e.preventDefault();
        scale += e.deltaY < 0 ? 0.1 : -0.1;
        scale = Math.max(0.2, Math.min(scale, 5));
        img.style.transform = `scale(${scale})`;
    }, { passive: false });

    // Click to close
    function closeOverlay() {
        overlay.style.display = "none";
        img.src = "";
    }

    overlay.addEventListener("click", function () {
        closeOverlay();
    });

    img.addEventListener("click", function (e) {
        e.stopPropagation();
        closeOverlay();
    });
})();