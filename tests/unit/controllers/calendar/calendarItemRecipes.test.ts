import { CalendarItemRecipesController } from "@/controllers/calendar/children/calendarItemRecipes";

const selectDatesByRecipeId = jest.fn();
jest.mock("@/repositories/calendarItems", () => ({
  CalendarItemsRepository: jest.fn().mockImplementation(() => ({
    selectDatesByRecipeId,
  })),
}));

describe("Calendar Item Recipes Controller", () => {
  let controller: CalendarItemRecipesController;

  beforeEach(() => {
    controller = new CalendarItemRecipesController(1);
  });

  it("Should trigger repository select dates on getDates call", async () => {
    await controller.getDates();
    expect(selectDatesByRecipeId).toHaveBeenCalledTimes(1);
  });
});
