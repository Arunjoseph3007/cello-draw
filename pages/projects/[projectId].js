import Head from "next/head";
//Components
import Leftbar from "@/components/Leftbar";
import Panel from "@/components/Panel";
import Rightbar from "@/components/Rightbar";
import Topbar from "@/components/Topbar";
//Hooks
import { useArray } from "@/hooks/useArray";
import { useRouter } from "next/router";
//Third party libs
import { useRecoilState } from "recoil";
import { useDeferredValue, useEffect, useState } from "react";
import axios from "axios";
import { prisma } from "@/lib/prisma";
//States
import { modeAtom } from "@/context/mode";
import { selectedShapeAtom } from "@/context/selectedShape";
import { selectedIDAtom } from "@/context/selectedID";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { ToastContainer } from "react-toastify";

export default function Home({ project }) {
  const elements = useArray();
  const [mode, setMode] = useRecoilState(modeAtom);
  const [selectedID, setSelectedID] = useRecoilState(selectedIDAtom);
  const [selectedShape, setSelectedShape] = useRecoilState(selectedShapeAtom);
  const deferredSelectedShape = useDeferredValue(selectedShape);

  const router = useRouter();
  const { projectId } = router.query;

  //$ Start up
  useEffect(() => {
    console.log(project);
    elements.setData(project.data);
  }, []);

  //$ Reacting to selected id change
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
      <ToastContainer position="bottom-right" />
      <Head>
        <title>Cello Draw</title>
        <meta name="description" content="A handy drawing app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar
        project={project}
        mode={mode}
        setMode={setMode}
        elements={elements}
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
      </div>
    </div>
  );
}

//$ Fetch
export const getServerSideProps = async ({ req, res, params }) => {
  const { projectId } = params;

  const { user } = await unstable_getServerSession(req, res, authOptions);

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        name: true,
        description: true,
        data: true,
        userId: true,
        id: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (user.id !== project.userId) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        project,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
