"use client";
// import { useRef, useState } from "react";
// import { signIn } from "next-auth/react";
// import { createUser } from "@/lib/auth";
// import Link from "next/link";

// export default function AuthForm() {

//   const [isLogin, setIsLogin] = useState(true);

//   const emailInputRef = useRef(null);
//   const passInputRef = useRef(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const email = emailInputRef.current.value;
//     const password = passInputRef.current.value;

//     if (isLogin) {
//       const result = await signIn("credentials", {
//         redirect: true,
//         email,
//         password,
//         callbackUrl: "/dashboard",
//       });
//     } else {
//       const res = await createUser(email, password);
//         if (!res)
//         {
//           throw new Error(`Something went wrong.Please try again `);
//         }
//     }
//   };

//   const switchAuthModeHandler = () => {
//     setIsLogin((prevState) => !prevState);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
//           {isLogin ? "Login" : "Sign Up"}
//         </h2>

//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="block mb-1 text-sm font-medium text-gray-600"
//           >
//             Enter email
//           </label>
//           <input
//             name="email"
//             type="email"
//             ref={emailInputRef}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="password"
//             className="block mb-1 text-sm font-medium text-gray-600"
//           >
//             Enter password
//           </label>
//           <input
//             name="password"
//             type="password"
//             ref={passInputRef}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
//           onClick={switchAuthModeHandler}
//         >
//           {isLogin ? "Login" : "Sign Up"}
//         </button>
//            <button
//           type="button"
         
//           className="mt-4 text-sm text-blue-500 hover:underline w-full"
//         >
//           {isLogin
//             ? "Don't have an account? Sign Up"
//             : "Already have an account? Login"}
//         </button>  
//       </form>
//     </div>
//   );
// }


import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { createUser } from "@/lib/auth";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const email = emailInputRef.current.value;
    const password = passInputRef.current.value;

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: true,
          email,
          password,
          callbackUrl: "/dashboard",
        });

        if (!result?.ok) {
          throw new Error("Login failed");
        }
      } else {
        const res = await createUser(email, password);
        console.log(res);
        if (!res) {
          throw new Error("Something went wrong. Please try again.");
        }
        const loginResult = await signIn("credentials",{
          redirect:true,
          email,
          password,
          callbackUrl:'/dashboard'
        })
        if(!loginResult?.ok)
        {
          throw new Error("Unauthenticated user ");
        }
      }
    } catch (err) {
      console.error(err.message || "Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-600"
          >
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
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium text-gray-600"
          >
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
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold py-2 px-4 rounded-lg transition duration-300`}
        >
          {isSubmitting
            ? isLogin
              ? "Logging in..."
              : "Signing up..."
            : isLogin
            ? "Login"
            : "Sign Up"}
        </button>

        <button
          type="button"
          onClick={switchAuthModeHandler}
          className="mt-4 text-sm text-blue-500 hover:underline w-full"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>
      </form>
    </div>
  );
}
