import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { friendRequests, conversations, friends, recommendedUsers, messages} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.use(authenticate);

// Get the friends of the user
userRouter.get( "/friends", friends );

// Get recommended users
userRouter.get("/recommended", recommendedUsers);

// Get friend request 
userRouter.get("/freind-requests", friendRequests);

// Get past conversations of the user
userRouter.get("/conversations", conversations);

// Get all the messages for a particular conversations 
userRouter.get("/conversations/:conversationId/messages", messages);


export default userRouter;
