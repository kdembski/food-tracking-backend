import Database from "@/config/database";
import { UserDTO } from "@/dtos/user";
import { UsersQueries } from "@/queries/users";

export class UsersRepository {
  async selectById(id: number) {
    const query = new UsersQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);

    return results[0] as UserDTO;
  }
}
