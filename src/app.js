import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js"
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

app.use(cors());

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));