import { prisma } from "@/lib/prisma";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function newProject(req, res) {
  console.log('hey');
  const { name, description } = req.body;
  const session = await unstable_getServerSession(req, res, authOptions);
  const { user } = session;

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        userId: user.id,
        data: [],
      },
    });

    if (newProject) {
      return res.status(200).json({ project: newProject });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
}
