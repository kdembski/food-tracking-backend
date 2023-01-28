import { MembersQueries } from "./../../queries/members/members";
import Database from "@/config/database";
import { MemberDTO } from "@/dtos/members/member";
import { IMembersRepository } from "@/interfaces/members/members";

export class MembersRepository implements IMembersRepository {
  async selectAll() {
    const query = new MembersQueries().getSelect();
    const results = await Database.sendQuery(query);
    return results as MemberDTO[];
  }
}
