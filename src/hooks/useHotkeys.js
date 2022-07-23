import { useEffect } from "react";

export const useHotkeys = (key, cb) => {
  const listener = (e) => {
    console.log(e);
  };

  useEffect(() => {
    document.addEventListener("keydown", listener);

    return document.removeEventListener("keydown", listener);
  });
};
