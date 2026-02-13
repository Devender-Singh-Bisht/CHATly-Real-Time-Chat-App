import { Database } from "./pool.js";

// Create a new user 
export async function createNewUser(email, password_hash, username, firstName, lastName, bio, profilePic, gender) {
    await Database.query(`INSERT INTO users (email, password_hash, username, first_name, last_name, bio, profile_pic_url, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [email, password_hash, username, firstName, lastName, bio, profilePic, gender]);
}

// Create a new message 
export async function createNewMessage(senderId, receiverId, text) {
    const query = `
        WITH inserted_row AS (
            INSERT INTO messages (sender_id, receiver_id, content)
            VALUES ($1, $2, $3)
            RETURNING *
        )
        SELECT 
            inserted_row.*, 
            users.first_name,
            users.last_name, 
            users.profile_pic_url
        FROM inserted_row 
        JOIN users ON inserted_row.sender_id = users.user_id;
    `;

    const values = [senderId, receiverId, text];

    const { rows } = await Database.query(query, values);
    return rows;
}


export async function createNewRequest(senderId, receiverId) {
    const query = `INSERT INTO friend_requests (sender_id, receiver_id, status) VALUES ($1, $2, $3)`;

    const values = [senderId, receiverId, 'pending'];

    const { rows } = await Database.query(query, values);
    return rows;
}