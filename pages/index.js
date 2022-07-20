import Head from "next/head";
import Leftbar from "@/components/Leftbar";
import Panel from "@/components/Panel";
import Rightbar from "@/components/Rightbar";
import Topbar from "@/components/Topbar";
import { useArray } from "@/hooks/useArray";
import styles from "../styles/Home.module.css";

export default function Home() {
  const elements = useArray([]);

  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Figma</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar />
      <div className="flex-1 flex justify-between">
        <Leftbar elements={elements} />
        <Panel elements={elements} />
        <Rightbar />
      </div>
    </div>
  );
}
