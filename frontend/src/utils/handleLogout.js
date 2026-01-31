
async function handleLogout() {

    const URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type": "application/json"
        }
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message | "Unable to Logout, please try again later.")
    }
};

export default handleLogout;
