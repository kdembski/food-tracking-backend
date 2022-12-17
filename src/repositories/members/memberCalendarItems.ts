import { MemberCalendarItemDTO } from "@/interfaces/members/memberCalendarItem";
import Database from "@/config/database";
import { IMemberCalendarItemsRepository } from "@/interfaces/members/memberCalendarItem";
import memberCalendarItemsQueries from "@/queries/members/memberCalendarItems";
import { OkPacket } from "mysql2";

export class MemberCalendarItemsRepository
  implements IMemberCalendarItemsRepository
{
  async selectByItemId(itemId: number) {
    const results = await Database.sendQuery(
      memberCalendarItemsQueries.selectByItemId,
      [itemId]
    );

    return results as MemberCalendarItemDTO[];
  }

  async selectByMemberId(memberId: number) {
    const results = await Database.sendQuery(
      memberCalendarItemsQueries.selectByMemberId,
      [memberId]
    );

    return results as MemberCalendarItemDTO[];
  }

  async insert(data: MemberCalendarItemDTO) {
    const results = await Database.sendQuery(
      memberCalendarItemsQueries.insert,
      [data.itemId, data.memberId]
    );

    return results as OkPacket;
  }

  async delete(id: number) {
    const results = await Database.sendQuery(
      memberCalendarItemsQueries.delete,
      [id]
    );

    return results as OkPacket;
  }

  async deleteByMemberIdAndItemId(itemId: number, memberId: number) {
    const results = await Database.sendQuery(
      memberCalendarItemsQueries.deleteByItemIdAndMemberId,
      [itemId, memberId]
    );

    return results as OkPacket;
  }
}
