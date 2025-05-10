'use client';
import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passInputRef.current.value;

    const result = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: '/dashboard',
    });

    console.log(result, "result");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">
            Enter email
          </label>
          <input
            name="email"
            type="email"
            ref={emailInputRef}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-600">
            Enter password
          </label>
          <input
            name="password"
            type="password"
            ref={passInputRef}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
