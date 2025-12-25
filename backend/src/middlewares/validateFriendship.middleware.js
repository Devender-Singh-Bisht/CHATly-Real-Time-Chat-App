import { getFriendsByUserID } from "../models/readDB.queries.js";
import { isValidBigIntID } from "../utils/validation.utils.js";


export const validateFriendship = async (req, res, next) => {

    try {
        const userId = req.userDetails.user_id;
        const otherUserId = req.params.conversationId;

        // Validating request path parameters 
        if (!otherUserId || otherUserId.trim() === "") {
            return res.status(400).json({ success: false, message: "Conversation ID is required." });
        }
        if (!isValidBigIntID(otherUserId)) {
            return res.status(400).json({ success: false, message: "Invalid Conversation Id." });
        }

        const friends = await getFriendsByUserID(userId);

        const isFriend = friends.some(f => String(f.user_id) === String(otherUserId));

        if (!isFriend) {
            return res.status(403).json({ success: false, message: "Invalid Conversation Id." });
        }

        next();
    } catch (error) {
        console.error("Error in validateFriendship middleware: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

};