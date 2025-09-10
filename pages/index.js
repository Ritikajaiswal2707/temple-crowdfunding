import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {session ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome, {session.user.name || session.user.email}</h1>
          <button
            onClick={() => signOut()}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Temple Crowdfunding</h1>
          <div className="space-x-4">
            <Link href="/auth/signin" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Sign In
            </Link>
            <Link href="/auth/signup" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
