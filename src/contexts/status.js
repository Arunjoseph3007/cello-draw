const { atom } = require("recoil");

export const statusAtom = atom({
  key: "status",
  default: {
    isDragging: false,
  },
});
