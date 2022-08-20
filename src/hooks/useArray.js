import { useRecoilState } from "recoil";
import { elementsAtom } from "@/context/elements";
import { useCallback, useEffect, useRef, useState } from "react";
import { selectedShapeAtom } from "@/context/selectedShape";

const capacity = 20;

export const useArray = () => {
  const [array, setArray] = useRecoilState(elementsAtom);
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeAtom);
  const historyRef = useRef([]);
  const pointerRef = useRef(-1);

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

  const push = (element) => {
    setArrayWithHistory((a) => [...a, element]);
  };

  const filter = (callback) => {
    setArrayWithHistory((a) => a.filter(callback));
  };

  const update = (index, newElement) => {
    setArrayWithHistory((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  };

  const remove = (i) => {
    const id = array[i].id;

    if (id === selectedShape?.id) {
      setSelectedShape(null);
    }

    if (array[i].type !== "GROUP") {
      setArrayWithHistory((a) => [
        ...a.slice(0, i),
        ...a.slice(i + 1, a.length),
      ]);
    } else {
      filter((a) => a.id !== id || a.parentId !== id);
    }
  };

  const clear = () => {
    setArrayWithHistory([]);
  };

  const updateById = (id, newElm) => {
    const index = array.findIndex((a) => a.id === id);
    if (index === -1) return;

    update(index, newElm);
  };

  const removeById = (id) => {
    const index = array.findIndex((a) => a.id === id);
    if (index === -1) return;

    remove(index);
  };

  const gatherIntoGroups = useCallback(
    (parentId = undefined) => {
      return array
        .filter((a) => a.parentId === parentId)
        .map((a) => {
          if (a.type === "GROUP") {
            return { ...a, childShapes: gatherIntoGroups(a.id) };
          } else {
            return a;
          }
        });
    },
    [array]
  );

  return {
    data: array,
    setData: setArrayWithHistory,
    push: push,
    filter: filter,
    update: update,
    remove: remove,
    clear: clear,
    removeById: removeById,
    updateById: updateById,
    gatherIntoGroups: gatherIntoGroups,
    undo: undo,
    redo: redo,
  };
};
