import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/urls.Schema.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { getUrlById, redirect, shorten } from "../controllers/urls.controller.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), authValidation, shorten);
urlsRouter.get("/urls/:id", getUrlById);
urlsRouter.get("/urls/open/:shortUrl", redirect);
urlsRouter.delete("urls/:id", authValidation)

export default urlsRouter;