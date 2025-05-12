import { NextRequest, NextResponse } from "next/server";

export  async function POST(req:NextRequest)
{
    try{
        const {email,password} = await req.json();

        const existingUsers = await fetch(`http://localhost:8000/users?email=${email}`);
        const existingUser = await existingUsers.json();
        if (existingUser.length > 0) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
          }

        const createUserResult = await fetch(`http://localhost:8000/users`,{
            method : 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        });

        if(!createUserResult.ok)
        {
            return NextResponse.json({message:"Failed to create a user"},{status:500});
        }

        const createdUser = await createUserResult.json();

        return NextResponse.json({
            message:"User created successfully",
            user:{
                id: createdUser.id,
                email: createdUser.email,
            }
        })
    }
    catch(error)
    {
      console.error("Signup error",error);
      return NextResponse.json({message:"Something went wrong"},{status:500});
    }
}