import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { getRanking, getUserMe } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/users/me", authValidation, getUserMe);
userRouter.get("/ranking", getRanking);

export default userRouter;