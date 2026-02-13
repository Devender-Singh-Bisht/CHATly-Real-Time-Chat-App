import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { friendRequests, conversations, friends, recommendedUsers, messages, addMessage, userByUsername, profile, sendFriendRequest, acceptFriendRequest, deleteFriendRequest} from "../controllers/user.controller.js";
import { validateMessage } from "../middlewares/validateMessage.middleware.js";
import { validateFriendship } from "../middlewares/validateFriendship.middleware.js";

const userRouter = express.Router();

userRouter.use(authenticate);

// Get the friends of the user
userRouter.get( "/friends", friends );

// Get recommended users
userRouter.get("/recommended", recommendedUsers);

// Get friend request 
userRouter.get("/friend-requests", friendRequests);

// Get all the conversations of the user
userRouter.get("/conversations", conversations);

// Get all the messages for a particular conversations 
userRouter.get("/conversations/:conversationId/messages",validateFriendship, messages);

// Get profile of the user 
userRouter.get("/profile", profile);

// Get a particular user 
userRouter.get("/:username", userByUsername);

// Add new message to a conversation 
userRouter.post("/conversations/:conversationId/messages",validateFriendship, validateMessage, addMessage);

userRouter.post("/friend-requests", sendFriendRequest);

userRouter.patch("/friend-requests", acceptFriendRequest);

userRouter.delete("/friend-requests", deleteFriendRequest);
export default userRouter;
