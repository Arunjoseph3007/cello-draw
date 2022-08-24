import { prisma } from "@/lib/prisma";

export default async function (req, res) {
  const { projectId } = req.query;

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

    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}
