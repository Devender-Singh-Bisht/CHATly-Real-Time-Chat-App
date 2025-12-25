import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { friendRequests, conversations, friends, recommendedUsers, messages, addMessage} from "../controllers/user.controller.js";
import { validateMessage } from "../middlewares/validateMessage.middleware.js";
import { validateFriendship } from "../middlewares/validateFriendship.middleware.js";

const userRouter = express.Router();

userRouter.use(authenticate);

// Get the friends of the user
userRouter.get( "/friends", friends );

// Get recommended users
userRouter.get("/recommended", recommendedUsers);

// Get friend request 
userRouter.get("/freind-requests", friendRequests);

// Get all the conversations of the user
userRouter.get("/conversations", conversations);

// Get all the messages for a particular conversations 
userRouter.get("/conversations/:conversationId/messages",validateFriendship, messages);

// Add new message to a conversation 
userRouter.post("/conversations/:conversationId/messages",validateFriendship, validateMessage, addMessage);


export default userRouter;
