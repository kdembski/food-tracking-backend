import { MemberCalendarItem } from "@/main/members/models/memberCalendarItem";
import { MemberCalendarItemsService } from "@/main/members/services/memberCalendarItems";

export class CalendarItemMembersService {
  private memberCalendarItemsService: MemberCalendarItemsService;

  constructor(memberCalendarItemsService = new MemberCalendarItemsService()) {
    this.memberCalendarItemsService = memberCalendarItemsService;
  }

  async addCalendarItemToMembers(itemId: number, memberIds: number[]) {
    const promises = memberIds.map((memberId) => {
      const memberCalendarItem = new MemberCalendarItem({
        itemId,
        memberId,
      });
      return this.memberCalendarItemsService.create(memberCalendarItem);
    });

    const results = await Promise.all(promises);
    return results;
  }

  async removeCalendarItemFromMembers(itemId: number, memberIds: number[]) {
    const promises = memberIds.map((memberId) => {
      return this.memberCalendarItemsService.deleteByMemberIdAndItemId(
        itemId,
        memberId
      );
    });

    const results = await Promise.all(promises);
    return results;
  }

  async updateCalendarItemForMembers(itemId: number, memberIds: number[]) {
    const calendarItemMembers =
      await this.memberCalendarItemsService.getByItemId(itemId);

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
