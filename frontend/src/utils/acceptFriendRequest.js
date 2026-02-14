

export async function acceptFriendRequest(senderId) {
    const URL = import.meta.env.VITE_API_URL;
    const friendRequestsUrl = `${URL}/api/user/friend-requests`;

    const response = await fetch(friendRequestsUrl, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ senderId })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Cannot accept request!");

    return data.data
}