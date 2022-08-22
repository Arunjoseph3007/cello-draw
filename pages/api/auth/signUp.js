import { prisma } from "@/lib/prisma";
import { setCookie } from "cookies-next";
import { sign } from "@/lib/jwt";

export default async function registerUser(req, res) {
  const { email, id, photoUrl, name } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      const token = await sign({ name: user.name, id: user.id });

      setCookie("token", token, { req, res, httpOnly: true });

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
      const token = sign({ name: newUser.name, id: newUser.id });
      setCookie("token", token, { httpOnly: true });

      return res.status(200).json({ user: newUser });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
}
