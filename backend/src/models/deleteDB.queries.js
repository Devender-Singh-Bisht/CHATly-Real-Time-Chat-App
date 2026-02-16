import { Database } from "./pool.js";


export async function deleteFriendRequestDB(requestId, currentUserId) {
    const query = `
        WITH deleted_request AS (
            DELETE FROM friend_requests
            WHERE request_id = $1
              AND (sender_id = $2 OR receiver_id = $2)
              AND status = 'pending'
            RETURNING request_id, sender_id, receiver_id
        )
        SELECT 
            u.bio, 
            u.first_name, 
            u.last_name, 
            u.user_id,
            u.username, 
            u.profile_pic_url, 
            dr.request_id
        FROM users u
        JOIN deleted_request dr ON u.user_id = dr.sender_id;
    `;

    const { rows } = await Database.query(query, [requestId, currentUserId]);
    return rows[0];
}