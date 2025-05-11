'use client';

import {signOut } from "next-auth/react"



export function Logout()
{
    const handleLogout=async()=>{
    signOut();

    }
    return (
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer" onClick={handleLogout}>
            Logout
          </button>
    )
}