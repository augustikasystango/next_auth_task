import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
export default function Home() {

  const session = getServerSession(authOptions);
  
  if(!session)
  {
    redirect('/signin');
  }
  redirect('/dashboard');
  
}
