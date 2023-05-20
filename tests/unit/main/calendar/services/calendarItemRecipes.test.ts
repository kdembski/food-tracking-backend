import { CalendarItemRecipesService } from "@/main/calendar/services/calendarItemRecipes";

const selectDatesByRecipeId = jest.fn();
jest.mock("@/repositories/calendarItems", () => ({
  CalendarItemsRepository: jest.fn().mockImplementation(() => ({
    selectDatesByRecipeId,
  })),
}));

describe("Calendar Item Recipes Service", () => {
  let service: CalendarItemRecipesService;

  beforeEach(() => {
    service = new CalendarItemRecipesService(1);
  });

  it("Should trigger repository select dates on getDates call", async () => {
    await service.getDates();
    expect(selectDatesByRecipeId).toHaveBeenCalledTimes(1);
  });
});
