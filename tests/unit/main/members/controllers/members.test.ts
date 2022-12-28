import { MembersController } from "@/main/members/controllers/members";

const selectAll = jest.fn();
jest.mock("@/repositories/members/members", () => ({
  MembersRepository: jest.fn().mockImplementation(() => ({
    selectAll,
  })),
}));

jest.mock("@/main/members/models/memberCalendarItem", () => ({
  MemberCalendarItem: jest.fn().mockImplementation((data) => data),
}));

describe("Members Controller", () => {
  let controller: MembersController;

  beforeEach(() => {
    controller = new MembersController();
  });

  it("Should call repository selectAll on getMembers call", async () => {
    await controller.getMembers();
    expect(selectAll).toHaveBeenCalledTimes(1);
  });
});
