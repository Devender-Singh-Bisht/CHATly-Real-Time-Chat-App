import { createNewMessage } from "../models/createDB.queries.js";
import { Database } from "../models/pool.js";
import { getFriendRequestbyUserId, getFriendsByUserID, getMessagesbyUserId, getPastConversations, getRecommendedUsersbyUserId, getUserById, getUserByUsername, searchUserByUsername } from "../models/readDB.queries.js";


export async function friends(req, res) {

    try {

        const user = req.userDetails;
        const friends = await getFriendsByUserID(user.user_id);

        res.json({
            success: true,
            count: friends.length || 0,
            data: friends
        });

    } catch (err) {
        console.error("Error in User controller: ", err);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }

}


export async function recommendedUsers(req, res) {

    try {

        const user = req.userDetails;
        const recommededUsers = await getRecommendedUsersbyUserId(user.user_id);

        res.json({
            success: true,
            count: recommededUsers.length || 0,
            data: recommededUsers
        });

    } catch (err) {
        console.error("Error in User controller: ", err);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
}


export async function friendRequests(req, res) {

    try {

        const user = req.userDetails;
        const freindRequests = await getFriendRequestbyUserId(user.user_id);

        res.json({
            success: true,
            count: freindRequests.length || 0,
            data: freindRequests
        })


    } catch (error) {
        console.error("Error in User controller: ", error);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
}


export async function conversations(req, res) {

    try {

        const user = req.userDetails;
        const conversations = await getPastConversations(user.user_id);

        res.json({
            success: true,
            count: conversations.length || 0,
            data: conversations
        })

    } catch (error) {
        console.error("Error in User controller: ", error);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }

}


export async function messages(req, res) {

    try {

        const otherUserId = req.params.conversationId;

        const user = req.userDetails;
        const messages = await getMessagesbyUserId(user.user_id, otherUserId);

        res.json({
            success: true,
            count: messages.length || 0,
            data: messages
        })

    } catch (error) {
        console.error("Error in User controller: ", error);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }

}


export async function addMessage(req, res) {

    try {

        const otherUserId = req.params.conversationId;

        const user = req.userDetails;
        const content = req.body.content;

        const message = await createNewMessage(user.user_id, otherUserId, content);

        res.json({
            success: true,
            count: message.length || 0,
            data: message
        })

    } catch (error) {
        console.error("Error in User controller: ", error);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }

}


export async function userByUsername(req, res) {

    try {
        const usernameToSearch = req.params.username;
        const userId = req.userDetails.user_id;
        const result = await searchUserByUsername(usernameToSearch, userId);

        res.json({
            success: true,
            count: result.length || 0,
            data: result
        })

    } catch (error) {
        console.error("Error in User controller: ", error);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
    
}


export async function profile(req, res) {

    try {
        const userId = req.userDetails.user_id;
        const result = await getUserById(userId);

        const {password_hash, ...user} = result[0];

        console.log("userdata", user)

        res.json({
            success: true,
            count: result.length || 0,
            data: [user]
        })

    } catch (error) {
        console.error("Error in User controller: ", error);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
    
}