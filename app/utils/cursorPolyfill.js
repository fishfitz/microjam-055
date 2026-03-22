// cursor-polyfill.js
export default () => {
  const cursorEl = document.createElement("div");
  cursorEl.style.position = "fixed";
  cursorEl.style.top = "0";
  cursorEl.style.left = "0";
  cursorEl.style.pointerEvents = "none";
  cursorEl.style.zIndex = "999999";
  cursorEl.style.width = "64px";
  cursorEl.style.height = "64px";
  cursorEl.style.backgroundRepeat = "no-repeat";
  cursorEl.style.backgroundSize = "contain";
  cursorEl.style.transform = "translate(-9999px, -9999px)";
  document.body.appendChild(cursorEl);

  let isClicked = false
  let activeCursor = null;
  let hotspotX = 0;
  let hotspotY = 0;

  function parseCursor(cursor) {
    if (!cursor || !cursor.includes("url")) return null;

    const match = cursor.match(/url\(["']?(.*?)["']?\)\s*(\d+)?\s*(\d+)?/);
    if (!match) return null;

    return {
      url: match[1],
      x: parseInt(match[2] || 0, 10),
      y: parseInt(match[3] || 0, 10),
    };
  }

  function updateCursor(e) {
    if (!activeCursor) return;

    console.log(`url("${activeCursor?.replace('.png', isClicked ? 'active.png' : '.png')}")`)

    if (e) cursorEl.style.transform = `translate(${e.clientX - hotspotX - 32}px, ${e.clientY - hotspotY - 32}px)`;
    cursorEl.style.backgroundImage = `url("${activeCursor?.replace('.png', isClicked ? 'active.png' : '.png')}")`;
  }

  function checkCursor(e) {
    let el = e.target;

    while (el && el !== document.documentElement) {
      const style = getComputedStyle(el);
      const parsed = parseCursor(style.cursor);

      if (parsed) {
        activeCursor = parsed.url;
        hotspotX = parsed.x;
        hotspotY = parsed.y;

        cursorEl.style.backgroundImage = `url("${activeCursor?.replace('.png', isClicked ? 'active.png' : '.png')}")`;
        cursorEl.style.display = "block";
        document.body.style.cursor = "none";
        return;
      }

      el = el.parentElement;
    }

    // fallback
    activeCursor = null;
    cursorEl.style.display = "none";
    document.body.style.cursor = "";
  }

  document.addEventListener("mousemove", (e) => {
    checkCursor(e);
    updateCursor(e);
  });

  document.addEventListener('mousedown', () => {
    isClicked = true;
    updateCursor();
  });

  document.addEventListener('mouseup', () => {
    isClicked = false;
    updateCursor();
  });
};