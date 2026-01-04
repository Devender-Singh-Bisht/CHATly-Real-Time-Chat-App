
export const getSearchResults = async (username) => {

    const URL = import.meta.env.VITE_API_URL;
    const usersUrl = `${URL}/api/user/${username}`;

    const response = await fetch(usersUrl, {
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

    return data.data
};
