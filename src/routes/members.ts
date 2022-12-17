import { Router } from "express";
import { MembersController } from "@/controllers/members/members";
import { ApiError } from "@/models/errors/apiError";

const membersRouter = Router();
const membersController = new MembersController();

membersRouter.get("/", async (request, response) => {
  try {
    const results = await membersController.getMembers();
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default membersRouter;
