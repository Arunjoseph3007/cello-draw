import { selector } from "recoil";
import { modeAtom } from "./mode";

import { LINE } from "@/controllers/line";
import { CIRCLE } from "@/controllers/circle";

const controllers = { LINE, CIRCLE };

export const controllerAtom = selector({
  key: "controller",
  get: ({ get }) => {
    const mode = get(modeAtom);
    return controllers[mode];
  },
});
