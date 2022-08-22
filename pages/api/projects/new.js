import { verify } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export default async function newProject(req, res) {
  const { name, description } = req.body;

  const user = await verify(req.cookies.token);

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
