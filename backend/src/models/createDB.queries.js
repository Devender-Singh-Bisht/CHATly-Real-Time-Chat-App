import {Database} from "./pool.js";

export async function createNewUser(email, password_hash, username, firstName, lastName, bio, profilePic, gender) {
    await Database.query(`INSERT INTO users (email, password_hash, username, first_name, last_name, bio, profile_pic_url, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [email, password_hash, username, firstName, lastName, bio, profilePic, gender]);
}