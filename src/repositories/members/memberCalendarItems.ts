import { OkPacket } from "mysql2";
import { MemberCalendarItem } from "@/main/members/models/memberCalendarItem";
import { MemberCalendarItemDTO } from "@/dtos/members/memberCalendarItem";
import { MemberCalendarItemsQueries } from "@/queries/members/memberCalendarItems";
import { BaseRepository } from "../_shared/base";
import { Database } from "@/config/database";

export class MemberCalendarItemsRepository extends BaseRepository<
  MemberCalendarItem,
  MemberCalendarItemDTO
> {
  protected queries: MemberCalendarItemsQueries;

  constructor(
    database = Database.getInstance(),
    queries = new MemberCalendarItemsQueries()
  ) {
    super(database, queries);
    this.queries = queries;
  }

  async selectByItemId(itemId: number) {
    const query = this.queries.getSelectByItemId();
    const results = await this.database.sendQuery(query, [itemId]);

    return results as MemberCalendarItemDTO[];
  }

  async selectByMemberId(memberId: number) {
    const query = this.queries.getSelectByMemberId();
    const results = await this.database.sendQuery(query, [memberId]);

    return results as MemberCalendarItemDTO[];
  }

  async deleteByMemberIdAndItemId(itemId: number, memberId: number) {
    const query = this.queries.getDeleteByMemberIdAndItemId();
    const results = await this.database.sendQuery(query, [itemId, memberId]);

    return results as OkPacket;
  }

  getFieldsToInsert(model: MemberCalendarItem) {
    return [model.itemId, model.memberId];
  }

  getFieldsToUpdate(model: MemberCalendarItem) {
    return [model.itemId, model.memberId, model.id];
  }
}
