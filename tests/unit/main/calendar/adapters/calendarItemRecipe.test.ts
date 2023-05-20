import { CalendarItemRecipeAdapter } from "@/main/calendar/adapters/calendarItemRecipe";

const getById = jest.fn().mockImplementation(() => ({
  cookedDate: new Date(2000, 1, 1),
}));
jest.mock("@/main/recipes/services/recipes", () => ({
  RecipesService: jest.fn().mockImplementation(() => ({
    getById,
  })),
}));

describe("Calendar Item Recipe Adapter", () => {
  let adapter: CalendarItemRecipeAdapter;

  beforeEach(() => {
    adapter = new CalendarItemRecipeAdapter(1);
  });

  it("Should load item", async () => {
    expect(() => adapter.item).toThrowError();
    await adapter.loadItem();
    expect(adapter.item).toEqual({ cookedDate: new Date(2000, 1, 1) });
  });

  it("Should throw error if item is not loaded", async () => {
    expect(() => adapter.item).toThrowError();
  });

  it("Should get and set item date", async () => {
    await adapter.loadItem();
    expect(adapter.getDate()).toEqual(new Date(2000, 1, 1));
    adapter.setDate(new Date(2000, 2, 2));
    expect(adapter.getDate()).toEqual(new Date(2000, 2, 2));
  });
});
