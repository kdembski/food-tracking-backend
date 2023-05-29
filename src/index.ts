import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { WebSocketsInitializer } from "@/websockets/initializer";
import { useRouter } from "./routes";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./.env.local" });
}

const app = express();
app.use(express.json());
app.use(cors());

const { router } = useRouter();
app.use(router);

const server = app.listen(process.env.PORT || 3000, () =>
  console.log("Server is running...")
);

new WebSocketsInitializer().execute(server);
