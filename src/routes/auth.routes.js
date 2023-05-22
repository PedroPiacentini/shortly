import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { userSchema, loginSchema } from "../schemas/auth.schemas.js";

const authRouter = Router();

authRouter.post("/signup");
authRouter.post("/signin");

export default authRouter;
