import userModel from "../models/user.js";
import Database from "../config/database.js";
import bcrypt from "bcryptjs";
import lodash from "lodash";

class UserController {
  static setRoutes(router) {
    router.post("/login", this.#login);
  }

  static #login(request, response) {
    const password = request.body.password;
    if (!password || !lodash.isString(password)) {
      return response
        .status(400)
        .json({ code: "PASSWORD_REQUIRED", message: "Hasło jest wymagane" });
    }

    Database.sendQuery(userModel.selectUser)
      .then((results) => {
        const user = results[0];

        if (bcrypt.compareSync(password, user.password)) {
          return response.json({ accessToken: user.access_token });
        }

        return response
          .status(400)
          .json({ code: "PASSWORD_INVALID", message: "Niepoprawne hasło" });
      })
      .catch((error) => response.send(error));
  }
}

export default UserController;
