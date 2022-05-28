import userModel from "../models/user.js";
import Database from "../config/database.js";
import bcrypt from "bcryptjs";

class UserController {
  static setRoutes(router) {
    router.post("/authenticate", this.#authenticate);
  }

  static #authenticate(request, response) {
    const password = request.body.password;
    if (!password) {
      return response.status(400).json({ code: "PASSWORD_REQUIRED" });
    }

    Database.sendQuery(userModel.selectUser)
      .then((results) => {
        const user = results[0];

        if (bcrypt.compareSync(password, user.password)) {
          return response.json({ accessToken: user.access_token });
        }

        return response.status(400).json({ code: "PASSWORD_INVALID" });
      })
      .catch((error) => response.send(error));
  }
}

export default UserController;
