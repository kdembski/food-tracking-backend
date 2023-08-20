import { MemberCalendarItemsService } from "@/main/members/services/memberCalendarItems";
import { MemberCalendarItem } from "@/main/members/models/memberCalendarItem";

const items = [{ id: 1, memberId: 1, itemId: 1 }];
const selectByItemId = jest.fn().mockImplementation(() => items);
const selectByMemberId = jest.fn().mockImplementation(() => items);
const selectById = jest.fn().mockImplementation(() => items[0]);
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

describe("Member Calendar Items Service", () => {
  let service: MemberCalendarItemsService;

  beforeEach(() => {
    service = new MemberCalendarItemsService();
  });

  it("Should return mapped item on getByItemId call", async () => {
    expect(await service.getByItemId(1)).toEqual([
      new MemberCalendarItem({ id: 1, memberId: 1, itemId: 1 }),
    ]);
    expect(selectByItemId).toHaveBeenCalledTimes(1);
  });

  it("Should return mapped item on getByMemberId call", async () => {
    expect(await service.getByMemberId(1)).toEqual([
      new MemberCalendarItem({ id: 1, memberId: 1, itemId: 1 }),
    ]);
    expect(selectByMemberId).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository getById on getById call", async () => {
    await service.getById(1);
    expect(selectById).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on create call", async () => {
    await service.create(
      new MemberCalendarItem({ id: 1, memberId: 1, itemId: 1 })
    );
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update call", async () => {
    await service.update(
      new MemberCalendarItem({ id: 1, memberId: 1, itemId: 1 })
    );
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on delete call", async () => {
    await service.delete(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository deleteByMemberIdAndItemId on deleteByMemberIdAndItemId call", async () => {
    await service.deleteByMemberIdAndItemId(1, 1);
    expect(deleteByMemberIdAndItemId).toHaveBeenCalledTimes(1);
  });
});