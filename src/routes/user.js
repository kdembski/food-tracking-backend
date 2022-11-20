import { Router } from "express";
import UserController from "../controllers/user.js";
import lodash from "lodash";
import { FIELD_REQUIRED } from "../consts/error-codes.js";

const userRouter = Router();

userRouter.post("/login", (request, response) => {
  const password = request.body.password;

  if (!password || !lodash.isString(password)) {
    return response
      .status(400)
      .json({ code: FIELD_REQUIRED, message: "Hasło jest wymagane" });
  }

  UserController.login(password)
    .then((accessToken) => response.json({ accessToken }))
    .catch((error) => response.status(400).send(error));
});

export default userRouter;
