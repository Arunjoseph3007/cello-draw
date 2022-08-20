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

import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

import Link from "next/link";

const Topbar = ({ mode, setMode, elements }) => {
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

  const auth = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center shadow-md px-4 bg-black text-white">
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
      <h1>{mode}</h1>
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

        {/* //? User info and profile pic */}
        {auth.user ? (
          <div className="dropdown dropdown-left flex gap-3 items-center rounded-lg px-3 cursor-pointer hover:bg-gray-600">
            <h2 tabIndex={0} className="text-md m-1">
              {auth?.user?.user_metadata?.user_name}
            </h2>
            <img
              tabIndex={0}
              className="w-8 aspect-square rounded-full"
              src={auth?.user?.user_metadata?.avatar_url}
            />
            <div className="dropdown-content menu p-5 shadow bg-base-100 rounded-md flex flex-col items-center">
              <Link passHref href={"/profile"}>
                <img
                  tabIndex={0}
                  className="w-16 aspect-square rounded-full"
                  src={auth?.user?.user_metadata?.avatar_url}
                />
              </Link>
              <h2 className="text-xl m-1">
                {auth?.user?.user_metadata?.user_name}
              </h2>
              <h2 className="text-sm m-1">{auth?.user?.email}</h2>
              <button
                onClick={auth.signOut}
                className="btn btn-primary my-5 w-full"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button className="btn btn-primary rounded-none" onClick={auth.signIn}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
