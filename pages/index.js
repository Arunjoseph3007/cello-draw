import Head from "next/head";
//Components
import Leftbar from "@/components/Leftbar";
import Panel from "@/components/Panel";
import Rightbar from "@/components/Rightbar";
import Topbar from "@/components/Topbar";
//Hooks
import { useArray } from "@/hooks/useArray";
//Third party libs
import { useRecoilState, useRecoilValue } from "recoil";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
//States
import { modeAtom } from "@/context/mode";
import { selectedShapeAtom } from "@/context/selectedShape";
import { selectedIDAtom } from "@/context/selectedID";

export default function Home() {
  const elements = useArray();
  const [mode, setMode] = useRecoilState(modeAtom);
  const [selectedID, setSelectedID] = useRecoilState(selectedIDAtom);
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeAtom);
  const deferredSelectedShape = useDeferredValue(selectedShape);

  useEffect(() => {
    if (selectedID === -1) return;

    setSelectedShape(elements.data.find((a) => a.id === selectedID));
  }, [selectedID]);

  const updateWithSelecctedShape=() => {
    if (!selectedShape) return;
    const index = elements.data.findIndex(
      (a) => a.id === deferredSelectedShape.id
    );

    if (!deferredSelectedShape || index === -1) return;

    elements.update(index, deferredSelectedShape);
  }

  // U I
  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Cello Draw</title>
        <meta name="description" content="A handy drawing app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar mode={mode} setMode={setMode} elements={elements} />
      <div className="flex-1 flex justify-between overflow-y-hidden">
        <Leftbar
          selectedID={selectedID}
          setSelectedID={setSelectedID}
          elements={elements}
        />
        <Panel elements={elements} mode={mode} />
        <Rightbar
          selectedShape={selectedShape}
          setSelectedShape={setSelectedShape}
          updateWithSelecctedShape={updateWithSelecctedShape}
        />
      </div>
    </div>
  );
}
