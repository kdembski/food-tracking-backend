import { MemberCalendarItem } from "@/main/members/models/memberCalendarItem";
import { CalendarItemMembersService } from "@/main/calendar/services/calendarItemMembers";

const create = jest.fn();
const deleteByMemberIdAndItemId = jest.fn();
const getByItemId = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve([{ memberId: 1 }, { memberId: 2 }])
  );

jest.mock("@/main/members/services/memberCalendarItems", () => ({
  MemberCalendarItemsService: jest.fn().mockImplementation(() => ({
    create,
    deleteByMemberIdAndItemId,
    getByItemId,
  })),
}));

describe("Calendar Item Members Service", () => {
  let service: CalendarItemMembersService;

  beforeEach(() => {
    service = new CalendarItemMembersService();
  });

  it("Should trigger create for each member id on addCalendarItemToMembers call", async () => {
    await service.addCalendarItemToMembers(1, [1, 2]);
    expect(create).toHaveBeenCalledTimes(2);
    expect(create).toHaveBeenLastCalledWith(
      new MemberCalendarItem({
        itemId: 1,
        memberId: 2,
      })
    );
  });

  it("Should trigger deleteByMemberIdAndItemId for each member id on removeCalendarItemFromMembers call", async () => {
    await service.removeCalendarItemFromMembers(1, [1, 2]);
    expect(deleteByMemberIdAndItemId).toHaveBeenCalledTimes(2);
    expect(deleteByMemberIdAndItemId).toHaveBeenLastCalledWith(1, 2);
  });

  it("Should update item members on updateCalendarItemForMembers", async () => {
    service.addCalendarItemToMembers = jest.fn().mockImplementation(() => []);
    service.removeCalendarItemFromMembers = jest
      .fn()
      .mockImplementation(() => []);

    await service.updateCalendarItemForMembers(1, [2, 3]);
    expect(service.addCalendarItemToMembers).toHaveBeenCalledWith(1, [3]);
    expect(service.removeCalendarItemFromMembers).toHaveBeenCalledWith(1, [1]);
  });
});
