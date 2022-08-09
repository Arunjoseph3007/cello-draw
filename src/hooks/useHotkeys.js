import { useEventListener } from "./useEventListener";

export const useHotkeys = (key = "", cb) => {
  let keysArray = key.replaceAll(" ").split("+");

  const options = {
    key: keysArray.pop(),
    ctrlKey: keysArray.includes("ctrl"),
    shiftKey: keysArray.includes("shift"),
    altKey: keysArray.includes("alt"),
  };

  useEventListener("keydown", (e) => {
    if (
      e.key       === options.key       &&
      e.altKey    === options.altKey    &&
      e.shiftKey  === options.shiftKey  &&
      e.ctrlKey   === options.ctrlKey
    ) {
      cb(e);
    }
  });
};
