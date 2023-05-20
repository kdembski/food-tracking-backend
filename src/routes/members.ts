import { Router } from "express";
import { ApiError } from "@/base/errors/models/apiError";
import { MembersService } from "@/main/members/services/members";

const membersRouter = Router();
const membersService = new MembersService();

membersRouter.get("/", async (request, response) => {
  try {
    const results = await membersService.getMembers();
    response.json(results);
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default membersRouter;
