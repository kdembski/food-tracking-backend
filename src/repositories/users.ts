import Database from "@/config/database";
import { UserDTO } from "@/dtos/user";
import { IUsersRepository } from "@/interfaces/users";
import { usersQueries } from "@/queries/users";

export class UsersRepository implements IUsersRepository {
  async selectById(id: number) {
    const results = await Database.sendQuery(usersQueries.selectById, [id]);
    return results[0] as UserDTO;
  }
}
