import { CopyIcon } from "@/icons/Copy";
import { TickIcon } from "@/icons/Tick";
import { useEffect, useRef, useState } from "react";
import ExpandableBox from "./ExpandableBox";

export default function ExportBox() {
  const [svg, setSvg] = useState(null);
  const [png, setPng] = useState(null);
  const [elm, setElm] = useState(true);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(elm);
    setCopied(true);
    setTimeout(() => setCopied(false), 20000);
  };

  useEffect(() => {
    //get window
    const win = window.URL || window.webkitURL || window;

    const elm = document.querySelector(`[dataId="cello-draw-selected-shape"]`);
    if (!elm) return console.log("Selected Shape Not found");

    const svgHtml = convertToSvg(elm.outerHTML);
    setElm(svgHtml);
    const svgBlob = new Blob([svgHtml]);
    const svgURL = win.createObjectURL(svgBlob);
    setSvg(svgURL);

    const canvas = canvasRef.current;
    const svgElm = htmlToElem(svgHtml);
    const data = new XMLSerializer().serializeToString(svgElm);

    const pngBlob = new Blob([data], { type: "image/svg+xml" });
    const pngUrl = win.createObjectURL(pngBlob);

    const img = new Image();
    img.src = pngUrl;

    img.onload = function () {
      canvas.getContext("2d").drawImage(img, 0, 0);
      win.revokeObjectURL(pngUrl);
      const imguri = canvas
        .toDataURL("image/png")
        .replace("image/png", "octet/stream");
      setPng(imguri);
    };
  }, []);

  return (
    <>
      <ExpandableBox title="Export">
        <div className="flex flex-col gap-3">
          <a href={svg} download="cellodraw.svg" className="btn">
            get svg
          </a>
          <a href={png} download="cellodraw.png" className="btn">
            get png
          </a>
          <button disabled={copied} className="btn flex justify-center items-center gap-2" onClick={handleCopy}>
            {copied ? (
              <>
                <TickIcon /> copied
              </>
            ) : (
              <>
                {" "}
                <CopyIcon /> Copy svg
              </>
            )}
          </button>
        </div>
      </ExpandableBox>
      <div className="hidden">
        <canvas
          width={700}
          height={500}
          style={{ position: "absolute", opacity: 0 }}
          ref={canvasRef}
        />
      </div>
    </>
  );
}

const convertToSvg = (item) =>
  `<svg width="700" height="500"  fill="black">${item}</svg>`;

function htmlToElem(html) {
  let temp = document.createElement("template");
  html = html.trim();
  temp.innerHTML = html;
  return temp.content.firstChild;
}
