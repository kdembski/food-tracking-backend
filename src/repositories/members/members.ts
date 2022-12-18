import Database from "@/config/database";
import { IMembersRepository, MemberDTO } from "@/interfaces/members/members";
import { membersQueries } from "@/queries/members/members";

export class MembersRepository implements IMembersRepository {
  async selectAll() {
    const results = await Database.sendQuery(membersQueries.select);
    return results as MemberDTO[];
  }
}
