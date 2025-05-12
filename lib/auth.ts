
//this is for login purpose
export async function authorizeUser(email: string, password: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/auth/login?email=${email}&password=${password}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      console.log(await res.text());
      throw new Error("User fetch failed");
    }
    const user = await res.json();
    console.log(user, "--15");

    return user;
  } catch (error) {
    console.log("Login error", error);
    return null;
  }
}


//this is for signup
export async function createUser(email: string, password: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Failer to create user");
    }
    const user = await res.json();
    console.log(user,"888")
    return user;
  } catch (error) {
    console.log("Login error", error);
    return null;
  }
}

export async function saveUserIfNotExists( email: string, name: string ) {
  const checkRes = await fetch(`http://localhost:3000/api/auth/login`);
  const existingUsers = await checkRes.json();

  if (existingUsers.length === 0) {
    return await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email,name),
    });
  }
}
