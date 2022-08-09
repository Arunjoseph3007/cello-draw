import { selectedShapeAtom } from "@/context/selectedShape";
import { useRecoilState } from "recoil";
import { ShapeRenderer } from ".";

export const GroupRenderer = ({ shapeRef, childShapes, ...props }) => {
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeAtom);

  console.log({ shapeRef, childShapes, ...props });

  if (!childShapes) return;

  console.log("yes", { shapeRef, childShapes, ...props });

  return (
    <g>
      {childShapes
        .filter((a) => !a?.hidden)
        .filter((a) => a.id !== selectedShape?.id)
        .map((a) => (
          <ShapeRenderer key={a.id} {...a} />
        ))}
    </g>
  );
};
