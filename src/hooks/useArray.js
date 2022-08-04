import { useRecoilState } from "recoil";
import { elementsAtom } from "@/context/elements";
import { useCallback, useEffect, useRef, useState } from "react";

export const useArray = () => {
  const [array, setArray] = useRecoilState(elementsAtom);

  const undo = () => {};

  const redo = () => {};

  const push = (element) => setArray((a) => [...a, element]);

  const filter = (callback) => setArray((a) => a.filter(callback));

  const update = (index, newElement) =>
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);

  const remove = (i) =>
    setArray((a) => [...a.slice(0, i), ...a.slice(i + 1, a.length)]);

  const clear = () => setArray([]);

  return {
    data: array,
    setData: setArray,
    push: push,
    filter: filter,
    update: update,
    remove: remove,
    clear: clear,
    undo: undo,
    redo: redo,
  };
};
