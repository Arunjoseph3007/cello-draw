import { useEffect, useRef } from "react";
import { useEventListener } from "./useEventListener";

export const useHotkeys = (key = "", cb) => {
  useEventListener("keydown", (e) => {
    if (e.key === key) {
      cb(e);
    }
  });
};
