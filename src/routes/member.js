import { Router } from "express";
import MemberController from "../controllers/member.js";

const memberRouter = Router();

memberRouter.get("/", (request, response) => {
  MemberController.getMembers()
    .then((results) => response.json(results))
    .catch((error) => response.status(400).send(error));
});

export default memberRouter;
