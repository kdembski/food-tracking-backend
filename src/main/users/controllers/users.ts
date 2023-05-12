import bcrypt from "bcryptjs";
import lodash from "lodash";
import { FIELD_REQUIRED, FIELD_INVALID } from "@/consts/errorCodes";
import { UsersRepository } from "@/repositories/users";
import { CustomError } from "@/base/errors/models/customError";

export class UsersController {
  async login(password: string) {
    if (!password || !lodash.isString(password)) {
      throw new CustomError({
        code: FIELD_REQUIRED,
        message: "Hasło jest wymagane",
      });
    }

    const user = await this.getDefaultUser();

    if (!bcrypt.compareSync(password, user.password)) {
      throw new CustomError({
        code: FIELD_INVALID,
        message: "Niepoprawne hasło",
      });
    }

    return user.accessToken;
  }

  getDefaultUser() {
    return new UsersRepository().selectById(1);
  }
}
