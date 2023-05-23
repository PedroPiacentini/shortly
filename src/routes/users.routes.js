import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const userRouter = Router();

userRouter.get("/users/me", authValidation)

export default userRouter;