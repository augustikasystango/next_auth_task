export async function authorizeUser(email:string, password:string) {
    try {
        const res = await fetch(`http://localhost:3000/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
            throw new Error(`Error fetching user.Please try again`);

        }
        const user = await res.json();
        console.log("Login success")
        return user;

    } catch (error) {
        console.log("Login error", error);
        return null;
    }
}