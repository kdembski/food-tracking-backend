import { MemberCalendarItemsRepository } from "@/repositories/members/memberCalendarItems";
import { MemberCalendarItem } from "@/main/members/models/memberCalendarItem";
import { IMemberCalendarItemsController } from "@/interfaces/members/memberCalendarItems";

export class MemberCalendarItemsController
  implements IMemberCalendarItemsController
{
  async getByItemId(itemId: number) {
    const results = await new MemberCalendarItemsRepository().selectByItemId(
      itemId
    );

    return results.map((result) => new MemberCalendarItem(result));
  }

  async getByMemberId(memberId: number) {
    const results = await new MemberCalendarItemsRepository().selectByMemberId(
      memberId
    );

    return results.map((result) => new MemberCalendarItem(result));
  }

  async getById(id: number) {
    const dto = await new MemberCalendarItemsRepository().selectById(id);
    return new MemberCalendarItem(dto);
  }

  create(item: MemberCalendarItem) {
    return new MemberCalendarItemsRepository().insert(item);
  }

  update(item: MemberCalendarItem) {
    return new MemberCalendarItemsRepository().update(item);
  }

  delete(id: number) {
    return new MemberCalendarItemsRepository().delete(id);
  }

  deleteByMemberIdAndItemId(itemId: number, memberId: number) {
    return new MemberCalendarItemsRepository().deleteByMemberIdAndItemId(
      itemId,
      memberId
    );
  }
}
