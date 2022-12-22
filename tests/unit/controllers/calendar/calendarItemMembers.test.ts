import { CalendarItemMembersController } from "@/controllers/calendar/calendarItemMembers";

const create = jest.fn();
const deleteByMemberIdAndItemId = jest.fn();
const getByItemId = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve([{ memberId: 1 }, { memberId: 2 }])
  );

jest.mock("@/controllers/members/memberCalendarItems", () => ({
  MemberCalendarItemsController: jest.fn().mockImplementation(() => ({
    create,
    deleteByMemberIdAndItemId,
    getByItemId,
  })),
}));

describe("Calendar Item Members Controller", () => {
  let controller: CalendarItemMembersController;

  beforeEach(() => {
    controller = new CalendarItemMembersController();
  });

  it("Should trigger create for each member id on addCalendarItemToMembers call", async () => {
    await controller.addCalendarItemToMembers(1, [1, 2]);
    expect(create).toHaveBeenCalledTimes(2);
    expect(create).toHaveBeenLastCalledWith({
      itemId: 1,
      memberId: 2,
    });
  });

  it("Should trigger deleteByMemberIdAndItemId for each member id on removeCalendarItemFromMembers call", async () => {
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
