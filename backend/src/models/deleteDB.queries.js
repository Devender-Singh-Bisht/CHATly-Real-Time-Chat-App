import { Database } from "./pool.js";


export async function deleteFriendRequestDB(requestId, currentUserId) {
    const query = `
        DELETE FROM friend_requests
        WHERE request_id = $1
          AND (sender_id = $2 OR receiver_id = $2)
          AND status = 'pending'
        RETURNING request_id;
    `;

    const { rows } = await Database.query(query, [requestId, currentUserId]);
    return rows;
}