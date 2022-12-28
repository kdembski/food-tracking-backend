import { Router } from "express";
import { UsersController } from "@/main/users/controllers/users";
import { ApiError } from "@/base/errors/models/apiError";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/login", async (request, response) => {
  try {
    const password = request.body.password;

    const accessToken = await usersController.login(password);
    response.json({ accessToken });
  } catch (error) {
    ApiError.create(error, response).send();
  }
});

export default usersRouter;
