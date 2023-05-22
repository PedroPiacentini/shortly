import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/urls.Schema.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), authValidation,)

export default urlsRouter;