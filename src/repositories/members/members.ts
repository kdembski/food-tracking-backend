import { MembersQueries } from "@/queries/members/members";
import { MemberDTO } from "@/dtos/members/member";
import { Database } from "@/config/database";

export class MembersRepository {
  protected queries: MembersQueries;
  protected database: Database;

  constructor(
    database = Database.getInstance(),
    queries = new MembersQueries()
  ) {
    this.queries = queries;
    this.database = database;
  }

  async selectAll() {
    const query = this.queries.getSelect();
    const results = await this.database.sendQuery(query);
    return results as MemberDTO[];
  }
}
