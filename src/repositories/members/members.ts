import Database from "@/config/database";
import { MemberDTO } from "@/dtos/members/member";
import { IMembersRepository } from "@/interfaces/members/members";
import { membersQueries } from "@/queries/members/members";

export class MembersRepository implements IMembersRepository {
  async selectAll() {
    const results = await Database.sendQuery(membersQueries.select);
    return results as MemberDTO[];
  }
}
