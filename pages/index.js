import Head from "next/head";
//Components
import Leftbar from "@/components/Leftbar";
import Panel from "@/components/Panel";
import Rightbar from "@/components/Rightbar";
import Topbar from "@/components/Topbar";
import SaveModal from "@/components/SaveModal";
//Hooks
import { useArray } from "@/hooks/useArray";
import { useEventListener } from "@/hooks/useEventListener";
import { useHotkeys } from "@/hooks/useHotkeys";
//Third party libs
import { useRecoilState } from "recoil";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import axios from "axios";
//States
import { modeAtom } from "@/context/mode";
import { selectedShapeAtom } from "@/context/selectedShape";
import { selectedIDAtom } from "@/context/selectedID";
import { useRouter } from "next/router";

export default function Home() {
  const elements = useArray();
  const router = useRouter();
  const [mode, setMode] = useRecoilState(modeAtom);
  const [selectedID, setSelectedID] = useRecoilState(selectedIDAtom);
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeAtom);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const deferredSelectedShape = useDeferredValue(selectedShape);

  //$ For preventing window close or refresh
  useEventListener("beforeunload", (e) => {
    e.preventDefault();
    alert("he");
    e.returnValue = "Do you want to exit?";
  });

  //$ Save shortcut
  useHotkeys("ctrl+s", (e) => {
    e.preventDefault();
    setSaveModalVisible(true);
  });

  //$ Save Handler
  const handleSave = async (name, description) => {
    try {
      const response = await axios.post("/api/projects/new", {
        name,
        description,
        data: elements.data,
      });

      const { project } = response.data;
      router.push(`/projects/${project.id}`);
    } catch (error) {
      console.log(error);
    }
    setSaveModalVisible(false);
  };

  useEffect(() => {
    if (selectedID === -1) return;

    setSelectedShape(elements.data.find((a) => a.id === selectedID));
  }, [selectedID]);

  const updateWithSelecctedShape = () => {
    if (!selectedShape || !deferredSelectedShape) return;

    elements.updateById(deferredSelectedShape.id, deferredSelectedShape);
  };

  // U I
  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Cello Draw</title>
        <meta name="description" content="A handy drawing app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar
        mode={mode}
        setMode={setMode}
        elements={elements}
        handleSave={() => setSaveModalVisible(true)}
      />
      <div className="flex-1 flex justify-between overflow-hidden">
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
        <SaveModal
          visible={saveModalVisible}
          setVisible={setSaveModalVisible}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
}
