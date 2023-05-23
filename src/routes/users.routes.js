import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { getUserMe } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/users/me", authValidation, getUserMe)

export default userRouter;