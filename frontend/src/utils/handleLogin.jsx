
async function handleLogin(email, password) {

    const URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data

};


export default handleLogin;
