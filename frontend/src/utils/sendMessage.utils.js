
export const sendMessage = async (recieverId, messageText) => {

    const URL = import.meta.env.VITE_API_URL;
    const messageUrl = `${URL}/api/user/conversations/${recieverId}/messages`;

    const response = await fetch(messageUrl, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: messageText
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
    }

    return data.data;
};