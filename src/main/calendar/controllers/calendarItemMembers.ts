import { ICalendarItemMembersController } from "@/interfaces/calendar/calendarItemMembers";
import { MemberCalendarItemsController } from "@/main/members/controllers/memberCalendarItems";

export class CalendarItemMembersController
  implements ICalendarItemMembersController
{
  async addCalendarItemToMembers(itemId: number, memberIds: number[]) {
    const promises = memberIds.map((memberId) => {
      return new MemberCalendarItemsController().create({
        itemId,
        memberId,
      });
    });

    const results = await Promise.all(promises);
    return results;
  }

  async removeCalendarItemFromMembers(itemId: number, memberIds: number[]) {
    const promises = memberIds.map((memberId) => {
      return new MemberCalendarItemsController().deleteByMemberIdAndItemId(
        itemId,
        memberId
      );
    });

    const results = await Promise.all(promises);
    return results;
  }

  async updateCalendarItemForMembers(itemId: number, memberIds: number[]) {
    const calendarItemMembers =
      await new MemberCalendarItemsController().getByItemId(itemId);

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