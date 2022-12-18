import { MemberCalendarItem } from "@/models/members/memberCalendarItem";
import { CalendarItemMembersController } from "@/controllers/calendar/calendarItemMembers";

const insert = jest.fn();
const deleteByMemberIdAndItemId = jest.fn();
jest.mock("@/repositories/members/memberCalendarItems", () => ({
  MemberCalendarItemsRepository: jest.fn().mockImplementation(() => ({
    insert,
    deleteByMemberIdAndItemId,
  })),
}));

const getMemberCalendarItemsByItemId = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve([{ memberId: 1 }, { memberId: 2 }])
  );
jest.mock("@/controllers/members/memberCalendarItems", () => ({
  MemberCalendarItemsController: jest.fn().mockImplementation(() => ({
    getMemberCalendarItemsByItemId,
  })),
}));

describe("Calendar Item Members Controller", () => {
  let controller: CalendarItemMembersController;

  beforeEach(() => {
    controller = new CalendarItemMembersController();
  });

  it("Should trigger repository insert for each member id on addCalendarItemToMembers call", async () => {
    await controller.addCalendarItemToMembers(1, [1, 2]);
    expect(insert).toHaveBeenCalledTimes(2);
    expect(insert).toHaveBeenLastCalledWith(
      new MemberCalendarItem({ itemId: 1, memberId: 2 })
    );
  });

  it("Should trigger repository delete for each member id on removeCalendarItemFromMembers call", async () => {
    await controller.removeCalendarItemFromMembers(1, [1, 2]);
    expect(deleteByMemberIdAndItemId).toHaveBeenCalledTimes(2);
    expect(deleteByMemberIdAndItemId).toHaveBeenLastCalledWith(1, 2);
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
