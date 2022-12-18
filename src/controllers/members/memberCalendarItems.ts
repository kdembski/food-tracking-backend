import { MemberCalendarItemDTO } from "./../../interfaces/members/memberCalendarItem";
import { MemberCalendarItemsRepository } from "@/repositories/members/memberCalendarItems";
import { MemberCalendarItem } from "@/models/members/memberCalendarItem";
import { IMemberCalendarItemsController } from "@/interfaces/members/memberCalendarItem";

export class MemberCalendarItemsController
  implements IMemberCalendarItemsController
{
  async getMemberCalendarItemsByItemId(itemId: number) {
    const results = await new MemberCalendarItemsRepository().selectByItemId(
      itemId
    );

    return results.map((result) => new MemberCalendarItem(result));
  }

  async getMemberCalendarItemsByMemberId(memberId: number) {
    const results = await new MemberCalendarItemsRepository().selectByMemberId(
      memberId
    );

    return results.map((result) => new MemberCalendarItem(result));
  }

  createMemberCalendarItem(dto: MemberCalendarItemDTO) {
    const item = new MemberCalendarItem(dto);
    return new MemberCalendarItemsRepository().insert(item);
  }

  deleteMemberCalendarItem(itemId: number, memberId: number) {
    return new MemberCalendarItemsRepository().deleteByMemberIdAndItemId(
      itemId,
      memberId
    );
  }
}
