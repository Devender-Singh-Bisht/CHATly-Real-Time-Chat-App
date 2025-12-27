export const getMessages = async (conversationId,{ limit = null, cursor = null } = {}) => {
    if (!conversationId) {
        throw new Error("conversationId is required");
    }

    const URL = import.meta.env.VITE_API_URL;

    const queryParams = new URLSearchParams({});

    if (limit) {
        queryParams.append("limit", limit);
    }
    if (cursor) {
        queryParams.append("cursor", cursor);
    }

    const messageUrl = `${URL}/api/user/conversations/${conversationId}/messages?${queryParams}`;

    const response = await fetch(messageUrl, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch messages");
    }

    console.log(data.data);

    return {
        chatMessages: data.data,
        nextCursor: data.nextCursor,
        hasMore: data.hasMore
    };
};
