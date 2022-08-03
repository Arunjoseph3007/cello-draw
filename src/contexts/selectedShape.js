import { atom, selector } from "recoil";
import { elementsAtom } from "./elements";

export const selectedIDAtom = atom({
  key: "selectedID",
  default: -1,
});

export const selectedShapeAtom = selector({
  key: "selectedShape",

  get: ({ get }) => {
    const elements = get(elementsAtom);
    const selectedID = get(selectedIDAtom);

    return elements?.find((elm) => elm.id === selectedID) || null;
  },

  set: ({ get, reset, set }, newVal) => {
    const selectedID = get(selectedIDAtom);
    const elements = get(elementsAtom);

    if (selectedID === -1 || !newVal) return null;

    const index = elements.findIndex((elm) => elm.id === selectedID);

    set(elementsAtom, (a) => [
      ...a.slice(0, index),
      newVal,
      ...a.slice(index + 1, a.length),
    ]);
  },
});
