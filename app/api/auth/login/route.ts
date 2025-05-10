import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    try {
        const response = await fetch(`http://localhost:8000/users?email=${email}`);
        if (!response.ok) {
            return NextResponse.json({ message: 'Cannot fetch users', response });
        }
        const users = await response.json();
        const matchedUser = users.find((user) => user.password === password);
        if (!matchedUser) {
            return NextResponse.json({ message: 'Invalid Credentials' }, { status: 401 });
        }
        return NextResponse.json({
            id: matchedUser.id,
            email: matchedUser.email,
            name: matchedUser.name,
        });

    }catch(error)
    {
        console.error(error || 'Something went wrong')
        return null;
    }
    
}