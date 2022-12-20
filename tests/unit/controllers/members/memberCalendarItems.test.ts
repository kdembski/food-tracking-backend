import { MemberCalendarItemsController } from "@/controllers/members/memberCalendarItems";

const items = [{ test: "test" }];
const selectByItemId = jest.fn().mockImplementation(() => items);
const selectByMemberId = jest.fn().mockImplementation(() => items);
const insert = jest.fn();
const deleteByMemberIdAndItemId = jest.fn();
jest.mock("@/repositories/members/memberCalendarItems", () => ({
  MemberCalendarItemsRepository: jest.fn().mockImplementation(() => ({
    selectByItemId,
    selectByMemberId,
    insert,
    deleteByMemberIdAndItemId,
  })),
}));

jest.mock("@/models/members/memberCalendarItem", () => ({
  MemberCalendarItem: jest.fn().mockImplementation((data) => data),
}));

describe("Member Calendar Items Controller", () => {
  let controller: MemberCalendarItemsController;

  beforeEach(() => {
    controller = new MemberCalendarItemsController();
  });

  it("Should return mapped item on getMemberCalendarItemsByItemId call", async () => {
    expect(await controller.getMemberCalendarItemsByItemId(1)).toEqual([
      { test: "test" },
    ]);
    expect(selectByItemId).toHaveBeenCalledTimes(1);
  });

  it("Should return mapped item on getMemberCalendarItemsByMemberId call", async () => {
    expect(await controller.getMemberCalendarItemsByMemberId(1)).toEqual([
      { test: "test" },
    ]);
    expect(selectByMemberId).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on createMemberCalendarItem call", async () => {
    await controller.createMemberCalendarItem({});
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository deleteByMemberIdAndItemId on deleteMemberCalendarItem call", async () => {
    await controller.deleteMemberCalendarItem(1, 1);
    expect(deleteByMemberIdAndItemId).toHaveBeenCalledTimes(1);
  });
});
