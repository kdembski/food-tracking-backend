import { CalendarItem } from "@/models/calendarItem";
import { CalendarItemsController } from "@/controllers/calendar/calendarItems";

const getCalendarItems = jest.fn();
jest.mock("@/controllers/calendar/getCalendarItems", () => ({
  GetCalendarItemsController: jest.fn().mockImplementation(() => ({
    getCalendarItems,
  })),
}));

const insert = jest
  .fn()
  .mockImplementation(() => Promise.resolve({ insertId: 1 }));
const update = jest.fn();
const selectById = jest.fn().mockImplementation(() => ({}));
const _delete = jest.fn();
jest.mock("@/repositories/calendarItems", () => ({
  CalendarItemsRepository: jest.fn().mockImplementation(() => ({
    insert,
    update,
    selectById,
    delete: _delete,
  })),
}));

const addCalendarItemToMembers = jest.fn();
jest.mock("@/controllers/calendar/calendarItemMembers", () => ({
  CalendarItemMembersController: jest
    .fn()
    .mockImplementation(() => ({ addCalendarItemToMembers })),
}));

const updateCookedDate = jest.fn();
jest.mock("@/models/recipes/recipe", () => ({
  Recipe: jest.fn().mockImplementation(() => ({ updateCookedDate })),
}));

const updateOrderedDate = jest.fn();
jest.mock("@/models/ordered-food/orderedFood", () => ({
  OrderedFood: jest.fn().mockImplementation(() => ({ updateOrderedDate })),
}));

describe("Calendar Items Controller", () => {
  let controller: CalendarItemsController;

  beforeEach(() => {
    controller = new CalendarItemsController();
  });

  it("Should trigger getCalendarItemsController getCalendarItems method on getCalendarItems call", async () => {
    await controller.getCalendarItems(new Date(), new Date());
    expect(getCalendarItems).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on createCalendarItem method", async () => {
    const date = new Date(2000, 0, 0);
    const members = [1, 2];
    const dto = {
      date,
      members,
      recipeId: 1,
      orderedFoodId: 1,
    };

    await controller.createCalendarItem(dto);

    expect(insert).toHaveBeenCalledWith(new CalendarItem(dto));
    expect(addCalendarItemToMembers).toHaveBeenCalledWith(1, [1, 2]);

    expect(updateCookedDate).toHaveBeenCalledTimes(1);
    expect(updateOrderedDate).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on updateCalendarItem method", async () => {
    const date = new Date(2000, 0, 0);
    await controller.updateCalendarItem({ date });

    expect(update).toHaveBeenCalledWith(new CalendarItem({ date }));
  });

  it("Should trigger repository delete on deleteCalendarItem method", async () => {
    const date = new Date(2000, 0, 0);
    await controller.deleteCalendarItem(1);

    expect(_delete).toHaveBeenCalledWith(1);
    expect(selectById).toHaveBeenCalledWith(1);
  });
});
