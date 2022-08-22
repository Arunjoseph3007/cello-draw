import { verify } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export default async function (req, res) {
  const { projectId } = req.query;

  const user = await verify(req.cookies.token);

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
        user: {
          select: {
            name: true,
            photoUrl: true,
          },
        },
      },
    });

    if (user.id !== project.userId) {
      return res.status(400).json({ error: "Not authorized" });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}
