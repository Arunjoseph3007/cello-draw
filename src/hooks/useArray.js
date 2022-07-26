import { useRecoilState } from "recoil";
import { elementsAtom } from "@/context/elements";
import { useCallback, useEffect, useRef, useState } from "react";

export const useArray = () => {
  const capacity = 30;
  const [array, setArray] = useRecoilState(elementsAtom);
  const historyRef = useRef([]);
  const pointerRef = useRef(0);

  const setArrayWithHistory = (v) => {
    const resolvedValue = typeof v === "function" ? v(array) : v;

    if (historyRef.current[pointerRef.current] !== resolvedValue) {
      if (pointerRef.current < historyRef.current.length - 1) {
        historyRef.current.splice(pointerRef.current + 1);
      }
      historyRef.current.push(resolvedValue);

      while (historyRef.current.length > capacity) {
        historyRef.current.shift();
      }
      pointerRef.current = historyRef.current.length - 1;
    }
    setArray(resolvedValue);
  };

  const undo = () => {
    if (pointerRef.current <= 0) return;
    pointerRef.current--;
    setArray(historyRef.current[pointerRef.current]);
  };

  const redo = () => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current++;
    setArray(historyRef.current[pointerRef.current]);
  };

  const push = (element) => setArrayWithHistory((a) => [...a, element]);

  const filter = (callback) => setArrayWithHistory((a) => a.filter(callback));

  const update = (index, newElement) =>
    setArrayWithHistory((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);

  const remove = (i) =>
    setArrayWithHistory((a) => [...a.slice(0, i), ...a.slice(i + 1, a.length)]);

  const clear = () => setArrayWithHistory([]);

  return {
    data: array,
    setData: setArrayWithHistory,
    push: push,
    filter: filter,
    update: update,
    remove: remove,
    clear: clear,
    undo: undo,
    redo: redo,
  };
};
