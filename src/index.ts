import express from "express";
import cors from "cors";
import router from "@/routes/index";
import Database from "@/config/database";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./.env.local" });
}

Database.initializeConnectionPool();

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
