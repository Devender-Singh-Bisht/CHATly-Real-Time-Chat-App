

export async function sendFriendRequest(receiverId) {
    const URL = import.meta.env.VITE_API_URL;
    const friendRequestsUrl = `${URL}/api/user/friend-requests`;

    const response = await fetch(friendRequestsUrl, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ receiverId })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Cannot send request!");

    return data.data
}