import { MemberCalendarItemsController } from "@/controllers/members/memberCalendarItems";
import { MemberCalendarItem } from "@/models/members/memberCalendarItem";
import { ICalendarItemMembersController } from "@/interfaces/calendar/calendarItemMembers";
import { MemberCalendarItemsRepository } from "@/repositories/members/memberCalendarItems";

export class CalendarItemMembersController
  implements ICalendarItemMembersController
{
  async addCalendarItemToMembers(itemId: number, memberIds: number[]) {
    const promises = memberIds.map((memberId) => {
      const memberCalendarItem = new MemberCalendarItem({
        memberId,
        itemId,
      });
      return new MemberCalendarItemsRepository().insert(memberCalendarItem);
    });

    const results = await Promise.all(promises);
    return results;
  }

  async removeCalendarItemFromMembers(itemId: number, memberIds: number[]) {
    const promises = memberIds.map((memberId) => {
      return new MemberCalendarItemsRepository().deleteByMemberIdAndItemId(
        itemId,
        memberId
      );
    });

    const results = await Promise.all(promises);
    return results;
  }

  async updateCalendarItemForMembers(itemId: number, memberIds: number[]) {
    const calendarItemMembers =
      await new MemberCalendarItemsController().getMemberCalendarItemsByItemId(
        itemId
      );

    const calendarItemMemberIds = calendarItemMembers
      .map((item) => item.memberId)
      .filter((id): id is number => !!id);

    const memberIdsToBeAdded = memberIds.filter(
      (id) => !calendarItemMemberIds.includes(id)
    );

    const memberIdsToBeRemoved = calendarItemMemberIds.filter(
      (id) => !memberIds.includes(id)
    );

    const removeResults = await this.removeCalendarItemFromMembers(
      itemId,
      memberIdsToBeRemoved
    );
    const addResults = await this.addCalendarItemToMembers(
      itemId,
      memberIdsToBeAdded
    );

    return [...removeResults, ...addResults];
  }
}
