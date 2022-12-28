import { Router } from "express";
import { ApiError } from "@/base/errors/models/apiError";
import { MembersController } from "@/main/members/controllers/members";

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
