import Link from "next/link";
import { getServerSession } from "next-auth";
import { Logout } from "./logout";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function MainHeaderLayout() {
 
  const session = await getServerSession(authOptions)

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6 text-gray-700 font-medium">
        {session && (
          <Link href="/profile" className="hover:text-blue-600 transition">
            Profile
          </Link>
        )}
        {session && (
          <Link href="/dashboard" className="hover:text-blue-600 transition">
            Dashboard
          </Link>
        )}
       {!session && <Link href="/signin" className="hover:text-blue-600 transition">
          Login
        </Link>}
      </div>
      {session && (
        <div>
          <Logout/>
        </div>
      )}
    </header>
  );
}
