'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <button onClick={() => signIn()}>Login</button>
  );
}
