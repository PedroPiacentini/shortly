import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { userSchema, loginSchema } from "../schemas/auth.schemas.js";
import { validateNewEmail } from "../middlewares/users.middlewares.js";


const authRouter = Router();

authRouter.post("/signup", validateSchema(userSchema), validateNewEmail, signUp);
authRouter.post("/signin", validateSchema(loginSchema));

export default authRouter;
