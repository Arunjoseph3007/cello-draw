import { newShapeAtom } from "@/context/newShape";
import { useRecoilState } from "recoil";

export const CIRCLE = {
  engaged: 0,

  onMouseDown: (e) => {
    //Get the positon

    const[newShape,setNewShape]=useRecoilState(newShapeAtom)
    const [x, y] = [e.clientX - position.x, e.clientY - position.y];

    //For first touch
    if (!this.engaged) {
      setNewShape({ x1: x, y1: y, x2: x, y2: y });
      this.engaged = 1;
    }

    //For second touch
    else {
      elements.push({ ...newLine, x2: x, y2: y });
      this.engaged = 0;
      setNewShape(null);
    }
  },
};
