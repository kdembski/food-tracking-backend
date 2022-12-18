import { CalendarItemOrderedFoodController } from "@/controllers/calendar/calendarItemOrderedFood";

const selectDatesByOrderedFoodId = jest.fn();
jest.mock("@/repositories/calendarItems", () => ({
  CalendarItemsRepository: jest.fn().mockImplementation(() => ({
    selectDatesByOrderedFoodId,
  })),
}));

describe("Calendar Item Ordered Food Controller", () => {
  let controller: CalendarItemOrderedFoodController;

  beforeEach(() => {
    controller = new CalendarItemOrderedFoodController();
  });

  it("Should trigger repository select dates on getDates call", async () => {
    await controller.getDates(1);
    expect(selectDatesByOrderedFoodId).toHaveBeenCalledTimes(1);
  });
});
