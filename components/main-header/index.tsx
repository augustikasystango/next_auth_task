
import Link from "next/link";
import SigninComponent from "./signin";

export default function MainHeaderLayout() {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6 text-gray-700 font-medium">
        <Link href="/profile" className="hover:text-blue-600 transition">Profile</Link>
        <Link href="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
        <Link href="/signin" className="hover:text-blue-600 transition">Login</Link>
       
      </div>
      <div>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer">
          Logout
        </button>
      </div>
    </header>
  );
}
