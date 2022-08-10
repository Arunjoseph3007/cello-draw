export const getPngUri = (elm, canvasRef) => {
  if (!elm || !canvasRef.current) return null;

  const win = window.URL || window.webkitURL || window;

  const canvas = canvasRef.current;
  const svgHtml = convertToSvg(elm.outerHTML);
  const svgElm = htmlToElem(svgHtml);
  const data = new XMLSerializer().serializeToString(svgElm);
  let imguri;

  const pngBlob = new Blob([data], { type: "image/svg+xml" });
  const pngUrl = win.createObjectURL(pngBlob);

  const img = new Image();
  img.src = pngUrl;

  img.onload = function () {
    canvas.getContext("2d").drawImage(img, 0, 0);
    win.revokeObjectURL(pngUrl);
    imguri = canvas
      .toDataURL("image/png")
      .replace("image/png", "octet/stream");
    return imguri
  };
};

function htmlToElem(html) {
  let temp = document.createElement("template");
  html = html.trim();
  temp.innerHTML = html;
  return temp.content.firstChild;
}

const convertToSvg = (item) =>
  `<svg width="700" height="500"  fill="black">${item}</svg>`;
