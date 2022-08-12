import { useState } from "react";

export const useResize = ({ shape, setShape, box }) => {
  const [engaged, setEngaged] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const scaleX = shape.scaleX || 1;
  const scaleY = shape.scaleY || 1;

  const ogHeight = box.height / scaleX;
  const ogWidth = box.ogWidth / scaleY;

  const onMouseDown = (e, dir) => {
    if (!engaged) {
      setEngaged(true);
      setAnchor({ x: e.clientX-ogHeight, y: e.clientY });
    } else {
      setEngaged(false);
      setAnchor(null);
    }
  };

  const onMouseMove=(e,dir)=>{

  }
};
