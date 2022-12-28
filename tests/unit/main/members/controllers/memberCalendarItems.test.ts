import { MemberCalendarItemsController } from "@/main/members/controllers/memberCalendarItems";

const items = [{ test: "test" }];
const selectByItemId = jest.fn().mockImplementation(() => items);
const selectByMemberId = jest.fn().mockImplementation(() => items);
const selectById = jest.fn();
const insert = jest.fn();
const update = jest.fn();
const _delete = jest.fn();
const deleteByMemberIdAndItemId = jest.fn();

jest.mock("@/repositories/members/memberCalendarItems", () => ({
  MemberCalendarItemsRepository: jest.fn().mockImplementation(() => ({
    selectByItemId,
    selectByMemberId,
    selectById,
    insert,
    update,
    delete: _delete,
    deleteByMemberIdAndItemId,
  })),
}));

jest.mock("@/main/members/models/memberCalendarItem", () => ({
  MemberCalendarItem: jest.fn().mockImplementation((data) => data),
}));

describe("Member Calendar Items Controller", () => {
  let controller: MemberCalendarItemsController;

  beforeEach(() => {
    controller = new MemberCalendarItemsController();
  });

  it("Should return mapped item on getByItemId call", async () => {
    expect(await controller.getByItemId(1)).toEqual([{ test: "test" }]);
    expect(selectByItemId).toHaveBeenCalledTimes(1);
  });

  it("Should return mapped item on getByMemberId call", async () => {
    expect(await controller.getByMemberId(1)).toEqual([{ test: "test" }]);
    expect(selectByMemberId).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository getById on getById call", async () => {
    await controller.getById(1);
    expect(selectById).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on create call", async () => {
    await controller.create({});
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update call", async () => {
    await controller.update({});
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on delete call", async () => {
    await controller.delete(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository deleteByMemberIdAndItemId on deleteByMemberIdAndItemId call", async () => {
    await controller.deleteByMemberIdAndItemId(1, 1);
    expect(deleteByMemberIdAndItemId).toHaveBeenCalledTimes(1);
  });
});
