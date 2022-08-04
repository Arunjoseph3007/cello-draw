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

  set: ({ get, reset, set }, newVal) => {},
});
