import {Database} from "./pool.js";

export async function getAllUsers() {
    const {rows} = await Database.query("SELECT * FROM users");
    return rows;
}

export async function getUserByEmail(email) {
    const { rows } = await Database.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return rows;
}

export async function getUserByUsername(username) {
    const { rows } = await Database.query(`SELECT * FROM users WHERE username = $1`, [username]);
    return rows;
}

export async function getUserById(id) {
    const { rows } = await Database.query(`SELECT * FROM users WHERE user_id = $1`, [id]);
    return rows;
}



