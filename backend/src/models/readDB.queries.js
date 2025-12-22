import { Database } from "./pool.js";

export async function getAllUsers() {
    const { rows } = await Database.query("SELECT * FROM users");
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

// Get all friends of a user
export async function getFriendsByUserID(id) {

    const query = `
        SELECT 
            u.user_id,
            u.email,
            u.username,
            u.first_name,
            u.last_name,
            u.bio,
            u.profile_pic_url,
            u.gender,
            u.last_seen
        FROM friend_requests fr
        JOIN users u 
            ON u.user_id = CASE 
                        WHEN fr.sender_id = $1 THEN fr.receiver_id
                        ELSE fr.sender_id
                        END
        WHERE fr.status = 'accepted'
            AND ($1 = fr.sender_id OR $1 = fr.receiver_id);
    `;

    const { rows } = await Database.query(query, [id]);
    return rows;

}

// Get recommended users for a user
export async function getRecommendedUsersbyUserId(id) {

    const query = `
        SELECT 
            u.user_id,
            u.email,
            u.username,
            u.first_name,
            u.last_name,
            u.bio,
            u.profile_pic_url,
            u.gender,
            u.last_seen
        FROM users u
        WHERE u.user_id != $1
            AND u.user_id NOT IN (
                SELECT 
                    CASE 
                        WHEN fr.sender_id = $1 THEN fr.receiver_id
                        ELSE fr.sender_id
                    END
                FROM friend_requests fr
                WHERE ($1 = fr.sender_id OR $1 = fr.receiver_id)
                    AND fr.status IN ('accepted', 'pending')
            )
        LIMIT 50;
    `;

    const { rows } = await Database.query(query, [id]);
    return rows;

}

// Get pending freind requests for a user
export async function getFriendRequestbyUserId(id) {

    const query = `
    SELECT 
      fr.request_id,
      fr.sender_id,
      fr.sent_at,
      u.user_id,
      u.username,
      u.first_name,
      u.last_name,
      u.profile_pic_url
      u.bio
    FROM friend_requests fr
    JOIN users u 
      ON u.user_id = fr.sender_id
    WHERE fr.receiver_id = $1
      AND fr.status = 'pending'
    ORDER BY fr.sent_at DESC;
  `;

    const { rows } = await Database.query(query, [id]);
    return rows;

}

// Get past conversations of a user
export async function getPastConversations(id) {

    const query = ` SELECT * FROM (
    SELECT DISTINCT ON (other_user_id)
        m.message_id,
        m.content,
        m.sent_at,
        other_user_id,
        u.username,
        u.first_name,
        u.last_name,
        u.profile_pic_url
    FROM (
        SELECT 
            m.*,
            CASE 
                WHEN m.sender_id = $1 THEN m.receiver_id
                ELSE m.sender_id
            END AS other_user_id
        FROM messages m
        WHERE m.sender_id = $1 OR m.receiver_id = $1
    ) AS m
    JOIN users u ON u.user_id = m.other_user_id
    ORDER BY 
        other_user_id,
        m.sent_at DESC,
        m.message_id DESC
    ) t
    ORDER BY sent_at DESC;`

    const { rows } = await Database.query(query, [id]);
    return rows;

}

// Get all messages for a user
export async function getMessagesbyUserId(id, otherUserId) {

    const query = `
        SELECT 
            message_id, 
            sender_id, 
            receiver_id, 
            message_type, 
            content,
            is_read, 
            sent_at
        FROM messages
        WHERE 
            (sender_id = $1 AND receiver_id = $2) 
            OR 
            (sender_id = $2 AND receiver_id = $1)
        ORDER BY sent_at ASC;
    `;

    const { rows } = await Database.query(query, [id, otherUserId]);
    return rows;

}


