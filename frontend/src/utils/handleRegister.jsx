
async function handleRegister(form) {

    const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password, confirmPassword: form.confirmPassword, username: form.username, firstName: form.firstName, lastName: form.lastName, gender: form.gender, bio: form.bio}),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data
};


export default handleRegister;
