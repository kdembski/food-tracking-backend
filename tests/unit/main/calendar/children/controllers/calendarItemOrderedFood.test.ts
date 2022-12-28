import { CalendarItemOrderedFoodController } from "@/main/calendar/children/controllers/calendarItemOrderedFood";

const selectDatesByOrderedFoodId = jest.fn();
jest.mock("@/repositories/calendarItems", () => ({
  CalendarItemsRepository: jest.fn().mockImplementation(() => ({
    selectDatesByOrderedFoodId,
  })),
}));

describe("Calendar Item Ordered Food Controller", () => {
  let controller: CalendarItemOrderedFoodController;

  beforeEach(() => {
    controller = new CalendarItemOrderedFoodController(1);
  });

  it("Should trigger repository select dates on getDates call", async () => {
    await controller.getDates();
    expect(selectDatesByOrderedFoodId).toHaveBeenCalledTimes(1);
  });
});
