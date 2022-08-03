import { useEffect } from "react";

export const useHotkeys = (key = "", cb, dependancyArray = []) => {
  const keys = key?.toUpperCase().replaceAll(" ", "").split("+");

  let options = {};

  options.ctrlKey = keys.includes("CTRL");
  options.altKey = keys.includes("ALT");
  options.shiftKey = keys.includes("SHIFT");
  options.key = keys.pop();

  useEffect(() => {
    const listener = (e) => {
      if (
        e.key.toUpperCase() !== options.key ||
        e.altKey !== options.altKey ||
        e.shiftKey !== options.shiftKey ||
        e.ctrlKey !== options.ctrlKey
      )
        return;
      cb(e);
    };

    document.addEventListener("keydown", (e) => {
      listener(e);
    });

    return document.removeEventListener("keydown", (e) => {
      listener(e);
    });
  }, dependancyArray);
};
