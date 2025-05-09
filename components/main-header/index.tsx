import Link from "next/link"
export default function MainHeaderLayout()
{
 return (
    <>
      <Link href={'/profile'}>Profile</Link>
      <Link href={'/dashboard'}>Dashboard</Link>
      <div>
        <button>Logout</button>
      </div>
    </>
 )
}