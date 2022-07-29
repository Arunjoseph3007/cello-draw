import { useEffect } from "react";

const TYPES = [
  "L", //Line : done completely (requires x y)
  "H", //Horizontal line : Done maybe a bit better UX (requires x)
  "V", //Vertical Line : Same as H ( reqires y)
  "T", //Sym Quadratic curve: done (requires x y)
  "Q", //Assyn Quadratic Curve : done (requires x1 y1, x2 y2)
  "S", //Sym Qubic curve : done (requires x1 y1, x2 y2)
  "C", //Probably most difficul (requires x1 y1, x2 y2, x3 y3)
];

const StylesPicker = ({ mode, setNewShape, newShape }) => {
  const handleClick = (pathType) =>
    setNewShape((prev) => ({ ...prev, pathType }));

  const listener = (e) => {
    if (TYPES.includes(e.key.toUpperCase())) {
      handleClick(e.key.toUpperCase());
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => listener(e));

    return document.removeEventListener("keydown", (e) => listener(e));
  }, []);

  if (mode !== "PATH") return null;

  return (
    <div className="absolute inset-x-5 bottom-2 h-10 bg-black text-white shadow-lg flex justify-around">
      {TYPES.map((elm) => (
        <button
          onClick={() => handleClick(elm)}
          className={`border-r border-white flex-1 hover:bg-gray-800 ${
            newShape?.pathType === elm && "bg-blue-400"
          }`}
          key={elm}
        >
          {elm}
        </button>
      ))}
    </div>
  );
};

export default StylesPicker;
