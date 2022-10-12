import userQueries from "../queries/user.js";
import Database from "../config/database.js";
import bcrypt from "bcryptjs";
import { convertKeysToCamelCase } from "../utils/convert-keys-to-camel-case.js";

class UserController {
  static login(password) {
    return new Promise((resolve, reject) => {
      this.getUser()
        .then((user) => {
          if (!bcrypt.compareSync(password, user.password)) {
            reject({ code: "PASSWORD_INVALID", message: "Niepoprawne hasło" });
          }

          resolve(user.accessToken);
        })
        .catch((error) => reject(error));
    });
  }

  static getUser() {
    return new Promise((resolve, reject) => {
      Database.sendQuery(userQueries.select)
        .then((results) => resolve(convertKeysToCamelCase(results[0])))
        .catch((error) => reject(error));
    });
  }
}

export default UserController;
