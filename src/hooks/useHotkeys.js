import { useEffect } from "react";

export const useHotkeys = (key = "", cb) => {
  useEffect(() => {

    const listener = (e) => {
      if (e.key !== key) return;
      cb(e);
    };
    
    document.addEventListener("keydown", (e) => {
      listener(e);
    });

    return document.removeEventListener("keydown", (e) => {
      listener(e);
    });
  }, []);
};
