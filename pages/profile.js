import { AuthContext } from "@/context/authContext";
import { PlusIcon } from "@/icons/Plus";
import Link from "next/link";
import { useContext } from "react";

export default function Profile() {
  const auth = useContext(AuthContext);

  return (
    <div className="full-screen overflow-hidden flex bg-gray-600">
      {/* //? Left profile bar */}
      <div className="w-1/4 h-full p-5 shadow bg-base-100 flex flex-col items-center">
        <img
          tabIndex={0}
          className="w-16 aspect-square rounded-full"
          src={auth?.user?.user_metadata?.avatar_url}
        />
        <h2 className="text-xl m-1">{auth?.user?.user_metadata?.user_name}</h2>
        <h2 className="text-sm m-1">{auth?.user?.email}</h2>
        <button onClick={auth.signOut} className="btn btn-primary my-5 w-full">
          Sign Out
        </button>
      </div>

      {/* //? Right section */}
      <div className="w-3/4 h-full overflow-y-scroll p-0">
        {/* //@ Image */}
        <img
          className="w-full"
          src="https://picsum.photos/1000/250?grayscale"
        />

        {/* //? Projects */}
        <div className="p-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold ">Projects</h1>
            <div className="w-full border-gray-400 border-t-2" />
          </div>

          {/* //@ Projects list */}
          <div className="grid grid-cols-4 gap-3 mt-4 overflow-x-scroll">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a) => (
              <Link href={"/projects/new"} key={a}>
                <div className="rounded-md cursor-pointer group overflow-hidden border border-gray-500">
                  <div className="w-full h-[150px] relative bg-gray-500 dead-center">
                    <PlusIcon />
                    <div className="absolute inset-0 dead-center bg-gray-900 transition opacity-0 group-hover:opacity-[1]">
                      <h1 className="text-sm text-center">
                        To start a new projects <br /> click here
                      </h1>
                    </div>
                  </div>
                  <div className="p-2">
                    <h1 className="text-xl">New Project</h1>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* //? Widgets */}
        <div className="p-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold ">Widgets</h1>
            <div className="w-full border-gray-400 border-t-2" />
          </div>

          {/* //@ Widgets list */}
          <div className="grid grid-cols-4 gap-3 mt-4 overflow-x-scroll">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a) => (
              <div
                key={a}
                className="rounded-md cursor-pointer group overflow-hidden border border-gray-500"
              >
                <div className="w-full h-[150px] relative bg-gray-500 dead-center">
                  <PlusIcon />
                  <div className="absolute inset-0 dead-center bg-gray-900 transition opacity-0 group-hover:opacity-[1]">
                    <h1 className="text-sm text-center">
                      To start a new projects <br /> click here
                    </h1>
                  </div>
                </div>
                <div className="p-2">
                  <h1 className="text-xl">New Project</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
