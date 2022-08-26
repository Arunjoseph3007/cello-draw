import { CircleIcon } from "@/icons/Circle";
import { LineIcon } from "@/icons/Line";
import { PolygonIcon } from "@/icons/Polygon";
import { FreehandIcon } from "@/icons/Freehand";
import { UndoIcon } from "@/icons/Undo";
import { RedoIcon } from "@/icons/Redo";
import { CloseIcon } from "@/icons/Close";
import { RectangleIcon } from "@/icons/Rectangle";
import { PathIcon } from "@/icons/Path";
import { GroupIcon } from "@/icons/Group";
import { MoveIcon } from "@/icons/Move";
import { SaveIcon } from "@/icons/Save";

import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const buttons = [
  { title: "LINE", icon: <LineIcon /> },
  { title: "CIRCLE", icon: <CircleIcon /> },
  { title: "FREEHAND", icon: <FreehandIcon /> },
  { title: "POLYGON", icon: <PolygonIcon /> },
  { title: "RECTANGLE", icon: <RectangleIcon /> },
  { title: "PATH", icon: <PathIcon /> },
  { title: "GROUP", icon: <GroupIcon /> },
  { title: "MOVE", icon: <MoveIcon /> },
];

const Topbar = ({ mode, setMode, elements, project }) => {
  const session = useSession();
  const user = session?.data?.user;

  //$ Save data
  const handleSave = async () => {
    console.log(project);
    try {
      await axios.post(`/api/projects/${project.id}/save`, {
        data: elements.data,
      });
      toast.success("Saved succesfully");
    } catch (e) {
      toast.error("Couldnt save somthing went wrong");
    }
  };

  return (
    <div className="flex justify-between items-center shadow-md px-4 bg-black text-white">
      {/* //? Tools */}
      <div className="flex gap-5">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => setMode(btn.title)}
            className={`p-3 hover:bg-blue-400 transition ${
              mode === btn.title && "text-black bg-blue-400"
            }`}
          >
            {btn.icon}
          </button>
        ))}
      </div>

      {/* //? Midddle */}
      {project ? <h1>{project.name}</h1> : <h1>{mode}</h1>}

      {/* //? Undo/Redo..... */}
      <div className="flex gap-3">
        <button onClick={elements.clear} className="p-3 hover:bg-blue-400">
          <CloseIcon />
        </button>
        <button onClick={elements.undo} className="p-3 hover:bg-blue-400">
          <UndoIcon />
        </button>
        <button onClick={elements.redo} className="p-3 hover:bg-blue-400">
          <RedoIcon />
        </button>
        {project && (
          <button onClick={handleSave} className="p-3 hover:bg-blue-400">
            <SaveIcon />
          </button>
        )}

        {/* //? User info and profile pic */}
        {session.status === "authenticated" ? (
          <div className="dropdown dropdown-left flex gap-3 items-center rounded-lg px-3 cursor-pointer hover:bg-gray-600">
            <h2 tabIndex={0} className="text-md m-1">
              {user.name}
            </h2>
            <img
              tabIndex={0}
              className="w-8 aspect-square rounded-full"
              src={user.image}
            />
            <div className="dropdown-content menu p-5 shadow bg-base-100 rounded-md flex flex-col items-center">
              <Link passHref href={"/profile"}>
                <img
                  tabIndex={0}
                  className="w-16 aspect-square rounded-full"
                  src={user.image}
                />
              </Link>
              <h2 className="text-xl m-1">{user.name}</h2>
              <h2 className="text-sm m-1">{user.email}</h2>
              <Link href="/api/auth/signout">
                <button className="btn btn-primary my-5 w-full">
                  Sign Out
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <Link href="/api/auth/signin">
            <button className="btn btn-primary rounded-none">Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
