import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="full-screen flex-col gap-5 dead-center bg-black text-white">
      <div>
        <h1 className="text-3xl font-semibold">404</h1>
      </div>
      <h2>OOPS! Couldn&apos;t find this page</h2>
      <Link href="/">
        <a className="hover:underline">Go back home</a>
      </Link>
    </div>
  );
}
