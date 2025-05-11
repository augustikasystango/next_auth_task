import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
export default async function ProfilePage()
{
   const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/signin");
    }
    return (
        <>
            <h1>Profile Page </h1>
             <h1>Welcome, {session.user?.email}!</h1>
             
        </>
    )

}