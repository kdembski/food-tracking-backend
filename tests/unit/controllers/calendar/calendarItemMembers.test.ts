import { CalendarItemMembersController } from "@/controllers/calendar/calendarItemMembers";

const createMemberCalendarItem = jest.fn();
const deleteMemberCalendarItem = jest.fn();
const getMemberCalendarItemsByItemId = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve([{ memberId: 1 }, { memberId: 2 }])
  );
jest.mock("@/controllers/members/memberCalendarItems", () => ({
  MemberCalendarItemsController: jest.fn().mockImplementation(() => ({
    createMemberCalendarItem,
    deleteMemberCalendarItem,
    getMemberCalendarItemsByItemId,
  })),
}));

describe("Calendar Item Members Controller", () => {
  let controller: CalendarItemMembersController;

  beforeEach(() => {
    controller = new CalendarItemMembersController();
  });

  it("Should trigger createMemberCalendarItem for each member id on addCalendarItemToMembers call", async () => {
    await controller.addCalendarItemToMembers(1, [1, 2]);
    expect(createMemberCalendarItem).toHaveBeenCalledTimes(2);
    expect(createMemberCalendarItem).toHaveBeenLastCalledWith({
      itemId: 1,
      memberId: 2,
    });
  });

  it("Should trigger deleteMemberCalendarItem for each member id on removeCalendarItemFromMembers call", async () => {
    await controller.removeCalendarItemFromMembers(1, [1, 2]);
    expect(deleteMemberCalendarItem).toHaveBeenCalledTimes(2);
    expect(deleteMemberCalendarItem).toHaveBeenLastCalledWith(1, 2);
  });

  it("Should update item members on updateCalendarItemForMembers", async () => {
    controller.addCalendarItemToMembers = jest
      .fn()
      .mockImplementation(() => []);
    controller.removeCalendarItemFromMembers = jest
      .fn()
      .mockImplementation(() => []);

    await controller.updateCalendarItemForMembers(1, [2, 3]);
    expect(controller.addCalendarItemToMembers).toHaveBeenCalledWith(1, [3]);
    expect(controller.removeCalendarItemFromMembers).toHaveBeenCalledWith(1, [
      1,
    ]);
  });
});
