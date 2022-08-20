import { prisma } from "@/lib/prisma";

export default async function registerUser(req, res) {
  const { id } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      return res.status(200).json({ user });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
}
