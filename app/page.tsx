import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Document Management App</h1>
      <Link href={"/auth/login"} className="bg-blue-500 text-white p-2 rounded">Go To Login</Link>
    </div>
  );
}
