import { Database } from "./pool.js";


export async function acceptFriendRequestDB(requestId, loggedInUserId) {
    const query = `
        UPDATE friend_requests
        SET 
            status = 'accepted',
            responded_at = NOW()
        WHERE request_id = $1 
          AND receiver_id = $2 
          AND status = 'pending'
        RETURNING *;
    `;

    const { rows } = await Database.query(query, [requestId, loggedInUserId]);

    if (rows.length === 0) {
        throw new Error("Request not found or unauthorized.");
    }

    return rows;
}