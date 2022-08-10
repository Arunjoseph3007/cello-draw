export const getSvgUri = (elm) => {
  if (!elm) return console.log("Selected Shape Not found");
  
  const win = window.URL || window.webkitURL || window;

  const svgHtml = convertToSvg(elm.outerHTML);
  const svgBlob = new Blob([svgHtml]);
  const svgURL = win.createObjectURL(svgBlob);
  return svgURL;
};

const convertToSvg = (item) =>
  `<svg width="700" height="500"  fill="black">${item}</svg>`;
