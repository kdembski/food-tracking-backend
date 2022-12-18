import { CalendarItemRecipesController } from "@/controllers/calendar/calendarItemRecipes";

const selectDatesByRecipeId = jest.fn();
jest.mock("@/repositories/calendarItems", () => ({
  CalendarItemsRepository: jest.fn().mockImplementation(() => ({
    selectDatesByRecipeId,
  })),
}));

describe("Calendar Item Recipes Controller", () => {
  let controller: CalendarItemRecipesController;

  beforeEach(() => {
    controller = new CalendarItemRecipesController();
  });

  it("Should trigger repository select dates on getDates call", async () => {
    await controller.getDates(1);
    expect(selectDatesByRecipeId).toHaveBeenCalledTimes(1);
  });
});
