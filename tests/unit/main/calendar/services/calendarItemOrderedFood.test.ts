import { CalendarItemOrderedFoodService } from "@/main/calendar/managers/calendarItemOrderedFood";

const selectDatesByOrderedFoodId = jest.fn();
jest.mock("@/repositories/calendarItems", () => ({
  CalendarItemsRepository: jest.fn().mockImplementation(() => ({
    selectDatesByOrderedFoodId,
  })),
}));

describe("Calendar Item Ordered Food Service", () => {
  let service: CalendarItemOrderedFoodService;

  beforeEach(() => {
    service = new CalendarItemOrderedFoodService(1);
  });

  it("Should trigger repository select dates on getDates call", async () => {
    await service.getDates();
    expect(selectDatesByOrderedFoodId).toHaveBeenCalledTimes(1);
  });
});
