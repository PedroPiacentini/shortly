import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/urls.Schema.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { getUrlById, shorten } from "../controllers/urls.controller.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), authValidation, shorten);
urlsRouter.get("/urls/:id", getUrlById);
urlsRouter.get("/urls/open/:shortUrl", getUrlById);

export default urlsRouter;