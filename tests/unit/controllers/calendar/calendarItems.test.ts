import { CalendarItem } from "@/models/calendarItem";
import { CalendarItemsController } from "@/controllers/calendar/calendarItems";

const getDays = jest.fn();
jest.mock("@/controllers/calendar/getCalendarItems", () => ({
  GetCalendarItemsController: jest.fn().mockImplementation(() => ({
    getDays,
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
jest.mock("@/controllers/calendar/calendarItemRecipes", () => ({
  CalendarItemRecipesController: jest
    .fn()
    .mockImplementation(() => ({ updateLastDate: updateCookedDate })),
}));

const updateOrderedDate = jest.fn();
jest.mock("@/controllers/calendar/calendarItemOrderedFood", () => ({
  CalendarItemOrderedFoodController: jest
    .fn()
    .mockImplementation(() => ({ updateLastDate: updateOrderedDate })),
}));

describe("Calendar Items Controller", () => {
  let controller: CalendarItemsController;

  beforeEach(() => {
    controller = new CalendarItemsController();
  });

  it("Should trigger getCalendarItemsController getDays method on getDays call", async () => {
    await controller.getDays(new Date(), new Date());
    expect(getDays).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on create method", async () => {
    const date = new Date(2000, 0, 0);
    const members = [1, 2];
    const dto = {
      date,
      members,
      recipeId: 1,
      orderedFoodId: 1,
    };

    await controller.create(dto);

    expect(insert).toHaveBeenCalledWith(new CalendarItem(dto));
    expect(addCalendarItemToMembers).toHaveBeenCalledWith(1, [1, 2]);

    expect(updateCookedDate).toHaveBeenCalledTimes(1);
    expect(updateOrderedDate).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update method", async () => {
    const date = new Date(2000, 0, 0);
    await controller.update({ date });

    expect(update).toHaveBeenCalledWith(new CalendarItem({ date }));
  });

  it("Should trigger repository delete on delete method", async () => {
    const date = new Date(2000, 0, 0);
    await controller.delete(1);

    expect(_delete).toHaveBeenCalledWith(1);
    expect(selectById).toHaveBeenCalledWith(1);
  });
});
