import { Database } from "./pool.js";


export async function acceptFriendRequestDB(requestId, loggedInUserId) {
    const query = `
        WITH updated_request AS (
            UPDATE friend_requests
            SET 
                status = 'accepted',
                responded_at = NOW()
            WHERE request_id = $1 
              AND receiver_id = $2 
              AND status = 'pending'
            RETURNING request_id, receiver_id, sender_id, status, sent_at, responded_at
        )
        SELECT 
            u.bio,
            u.user_id,n
            u.first_name, 
            u.last_name, 
            u.user_id AS receiver_id, -- The user who accepted
            u.username, 
            u.profile_pic_url, 
            ur.request_id,
            ur.sender_id,
            ur.status,
            ur.sent_at,
            ur.responded_at
        FROM users u
        JOIN updated_request ur ON u.user_id = ur.receiver_id;
    `;

    const { rows } = await Database.query(query, [requestId, loggedInUserId]);

    if (rows.length === 0) {
        throw new Error("Request not found or unauthorized.");
    }

    return rows; 
}