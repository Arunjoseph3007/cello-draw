import { PlusIcon } from "@/icons/Plus";
import { prisma } from "@/lib/prisma";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Profile({ userInfo }) {
  const session = useSession();
  const user = session?.data?.user;

  return (
    <div className="full-screen overflow-hidden flex bg-gray-600">
      {/* //? Left profile bar */}
      <div className="w-1/4 h-full p-5 shadow bg-base-100 flex flex-col items-center">
        <img
          tabIndex={0}
          className="w-16 aspect-square rounded-full"
          src={user?.image}
        />
        <h2 className="text-xl m-1">{user?.name}</h2>
        <h2 className="text-sm m-1">{user?.email}</h2>
        <Link href="/api/auth/signout">
          <button className="btn btn-primary my-5 w-full">Sign Out</button>
        </Link>
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
            {userInfo.projects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id}>
                <div className="rounded-md cursor-pointer group overflow-hidden border border-gray-500">
                  <div className="w-full h-[150px] relative bg-gray-500 dead-center">
                    <img
                      src={`https://picsum.photos/${Math.floor(
                        Math.random() * 30 + 300
                      )}/150?blur=1&grayscale`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 dead-center bg-gray-900 transition opacity-0 group-hover:opacity-[1]">
                      <h1 className="text-sm text-center">
                        {project.description}
                      </h1>
                    </div>
                  </div>
                  <div className="p-2">
                    <h1 className="text-xl">{project.name}</h1>
                  </div>
                </div>
              </Link>
            ))}
            <Link href={"/projects/new"}>
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

export const getServerSideProps = async (ctx) => {
  try {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      authOptions
    );

    const { user } = session;

    const userInfo = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        name: true,
        id: true,
        email: true,
        image: true,
        projects: {
          select: {
            name: true,
            description: true,
            id: true,
          },
        },
      },
    });

    return {
      props: {
        userInfo,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
