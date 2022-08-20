import { prisma } from "@/lib/prisma";

export default async function registerUser(req, res) {
  const { email, id, photoUrl, name } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      return res.status(200).json({ user });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        id,
        photoUrl,
        name,
      },
    });

    if (newUser) {
      return res.status(200).json({ user: newUser });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
}
