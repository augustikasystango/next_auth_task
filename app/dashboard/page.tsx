import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
export default async function DashboardPage()
{
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/signin");
    }
    return (
        <>
            <h1>Dashboard Page </h1>
        </>
    )
}