import { Database } from "@/config/database";
import { UserDTO } from "@/dtos/user";
import { UsersQueries } from "@/queries/users";

export class UsersRepository {
  private queries: UsersQueries;
  private database: Database;

  constructor(database = Database.getInstance(), queries = new UsersQueries()) {
    this.database = database;
    this.queries = queries;
  }

  async selectById(id: number) {
    const query = this.queries.getSelectById();
    const results = await this.database.sendQuery(query, [id]);

    return results[0] as UserDTO;
  }
}
