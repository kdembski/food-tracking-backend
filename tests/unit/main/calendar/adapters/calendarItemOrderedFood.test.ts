import { CalendarItemOrderedFoodAdapter } from "@/main/calendar/adapters/calendarItemOrderedFood";

const getById = jest.fn().mockImplementation(() => ({
  orderedDate: new Date(2000, 1, 1),
}));
jest.mock("@/main/ordered-food/controllers/orderedFood", () => ({
  OrderedFoodController: jest.fn().mockImplementation(() => ({
    getById,
  })),
}));

describe("Calendar Item Ordered Food Adapter", () => {
  let adapter: CalendarItemOrderedFoodAdapter;

  beforeEach(() => {
    adapter = new CalendarItemOrderedFoodAdapter(1);
  });

  it("Should load item", async () => {
    expect(() => adapter.item).toThrowError();
    await adapter.loadItem();
    expect(adapter.item).toEqual({ orderedDate: new Date(2000, 1, 1) });
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
