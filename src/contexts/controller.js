import { selector } from "recoil";
import { modeAtom } from "./mode";

import { LINE } from "@/controllers/line";
import { CIRCLE } from "@/controllers/circle";

const controller = { LINE, CIRCLE };

export const controllerAtom = selector({
  key: "cotroller", 
  get: ({ get }) => {
    const mode = get(modeAtom);

    return controller[mode];
  },
});
