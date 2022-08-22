import { SignJWT, jwtVerify } from "jose";

const secret = process.env.JWT_SECRET;

export async function sign(payload) {
  try {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24; // one day

    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(secret));
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export async function verify(token) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    // run some checks on the returned payload, perhaps you expect some specific values

    // if its all good, return it, or perhaps just return a boolean
    return payload;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
