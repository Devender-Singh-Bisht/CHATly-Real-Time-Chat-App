import { createNewMessage, createNewRequest } from "../models/createDB.queries.js";
import { deleteFriendRequestDB } from "../models/deleteDB.queries.js";
import { getFriendRequest, getFriendRequestbyUserId, getFriendsByUserID, getMessagesbyUserId, getPastConversations, getRecommendedUsersbyUserId, getUserById, getUserByUsername, searchUserByUsername } from "../models/readDB.queries.js";
import { acceptFriendRequestDB } from "../models/updateDB.queries.js";
import { getIO } from "../sockets/socket.js";


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

        const io = getIO();

        io.to(`user: ${otherUserId}`).emit('new_message', message[0]);

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

        const { password_hash, ...user } = result[0];

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


export async function sendFriendRequest(req, res) {
    try {
        const user = req.userDetails;
        const senderId = user.user_id;
        const receiverId = req.body.receiverId;

        const receiverValidCheck = await getUserById(receiverId);
        if (receiverValidCheck.length < 1) {
            return res.status(400).json({ success: false, message: "No such receiver exist!" });
        }

        const requests = await getFriendRequest(senderId, receiverId);
        if (requests.length > 0) {
            return res.status(400).json({ success: false, message: "Request Already Exist." })
        }

        const request = await createNewRequest(senderId, receiverId);

        const io = getIO();
        io.to(`user: ${receiverId}`).emit('new_request', request[0]);

        return res.status(200).json({
            success: true,
            count: 1,
            data: request[0]
        })
    } catch (error) {
        console.error("Error in User controller: ", error);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
}


export async function acceptFriendRequest(req, res) {
    try {
        const user = req.userDetails;
        const receiverId = user.user_id;
        const senderId = req.body.senderId;

        const senderValidCheck = await getUserById(senderId);
        if (senderValidCheck.length < 1) {
            return res.status(400).json({ success: false, message: "No such Request exists!" });
        }

        const requests = await getFriendRequest(senderId, receiverId);
        if (requests.length < 1) {
            return res.status(400).json({ success: false, message: "Request does not exist." })
        }
        
        if ((requests[0]["receiver_id"] !== receiverId) && (requests[0].status !== 'pending')) {
            return res.status(400).json({ success: false, message: "No such request Exists!"})
        } 

        const request = await acceptFriendRequestDB(requests[0].request_id, receiverId);
        return res.status(200).json({
            success: true,
            count: 1,
            data: request
        })
    } catch (error) {
        console.error("Error in User controller: ", error);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
}


export async function deleteFriendRequest(req, res) {
    try {
        const user = req.userDetails;
        const receiverId = user.user_id;
        const senderId = req.body.senderId;

        const senderValidCheck = await getUserById(senderId);
        if (senderValidCheck.length < 1) {
            return res.status(400).json({ success: false, message: "No such Request exists!" });
        }

        const requests = await getFriendRequest(senderId, receiverId);
        if (requests.length < 1) {
            return res.status(400).json({ success: false, message: "Request does not exist." })
        }
        
        if (requests[0].status !== 'pending') {
            return res.status(400).json({ success: false, message: "No such request Exists!"})
        } 

        const request = await deleteFriendRequestDB(requests[0].request_id, receiverId);
        return res.status(200).json({
            success: true,
            count: 1,
            data: request
        })
    } catch (error) {
        console.error("Error in User controller: ", error);
        res.status(500).json({ success: false, message: "Internal Server error" });
    }
}


