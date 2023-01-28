import { MemberCalendarItem } from "../../main/members/models/memberCalendarItem";
import Database from "@/config/database";
import { IMemberCalendarItemsRepository } from "@/interfaces/members/memberCalendarItems";
import { OkPacket } from "mysql2";
import { MemberCalendarItemDTO } from "@/dtos/members/memberCalendarItem";
import { MemberCalendarItemsQueries } from "@/queries/members/memberCalendarItems";

export class MemberCalendarItemsRepository
  implements IMemberCalendarItemsRepository
{
  async selectById(id: number) {
    const query = new MemberCalendarItemsQueries().getSelectById();
    const results = await Database.sendQuery(query, [id]);
    const dto = results[0] as MemberCalendarItemDTO;

    return dto;
  }

  async selectByItemId(itemId: number) {
    const query = new MemberCalendarItemsQueries().getSelectByItemId();
    const results = await Database.sendQuery(query, [itemId]);

    return results as MemberCalendarItemDTO[];
  }

  async selectByMemberId(memberId: number) {
    const query = new MemberCalendarItemsQueries().getSelectByMemberId();
    const results = await Database.sendQuery(query, [memberId]);

    return results as MemberCalendarItemDTO[];
  }

  async insert(data: MemberCalendarItem) {
    const query = new MemberCalendarItemsQueries().getInsert();
    const results = await Database.sendQuery(query, [
      data.itemId,
      data.memberId,
    ]);

    return results as OkPacket;
  }

  async update(data: MemberCalendarItem) {
    const query = new MemberCalendarItemsQueries().getUpdate();
    const results = await Database.sendQuery(query, [
      data.itemId,
      data.memberId,
      data.id,
    ]);

    return results as OkPacket;
  }

  async delete(id: number) {
    const query = new MemberCalendarItemsQueries().getDelete();
    const results = await Database.sendQuery(query, [id]);

    return results as OkPacket;
  }

  async deleteByMemberIdAndItemId(itemId: number, memberId: number) {
    const query =
      new MemberCalendarItemsQueries().getDeleteByMemberIdAndItemId();
    const results = await Database.sendQuery(query, [itemId, memberId]);

    return results as OkPacket;
  }
}
