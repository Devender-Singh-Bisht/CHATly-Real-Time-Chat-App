function signUp(req, res) {
    res.send("Sign up");
}

function login(req, res) {
    res.send("Log in");
}

function logout(req, res) {
    res.send("Log out");
}

export {signUp, login, logout};