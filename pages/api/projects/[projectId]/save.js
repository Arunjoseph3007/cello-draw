import { prisma } from "@/lib/prisma";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default async function saveProject(req, res) {
  const { data } = req.body;
  const { user } = await unstable_getServerSession(req, res, authOptions);

  try {
    const savedProject = await prisma.project.updateMany({
      where: {
        id: req.query.projectId,
        userId: user.id,
      },
      data: {
        data: data,
      },
    });

    return res.status(200).json({ project: savedProject });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
}
