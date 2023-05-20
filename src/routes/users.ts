import { Router } from "express";
import { UsersService } from "@/main/users/services/users";
import { ApiError } from "@/base/errors/models/apiError";

const usersRouter = Router();
const usersService = new UsersService();

usersRouter.post("/login", async (request, response) => {
  try {
    const password = request.body.password;

    const accessToken = await usersService.login(password);
    response.json({ accessToken });
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default usersRouter;
