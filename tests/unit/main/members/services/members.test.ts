import { MembersService } from "@/main/members/services/members";

const selectAll = jest.fn();
jest.mock("@/repositories/members/members", () => ({
  MembersRepository: jest.fn().mockImplementation(() => ({
    selectAll,
  })),
}));

jest.mock("@/main/members/models/memberCalendarItem", () => ({
  MemberCalendarItem: jest.fn().mockImplementation((data) => data),
}));

describe("Members Service", () => {
  let service: MembersService;

  beforeEach(() => {
    service = new MembersService();
  });

  it("Should call repository selectAll on getMembers call", async () => {
    await service.getMembers();
    expect(selectAll).toHaveBeenCalledTimes(1);
  });
});
