import { CalendarItem } from "@/models/calendarItem";
import { CalendarItemsController } from "@/controllers/calendar/calendarItems";

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

const getChildController = jest
  .fn()
  .mockImplementation(() => ({ updateLastDate }));
const updateLastDate = jest.fn();

jest.mock(
  "@/controllers/calendar/children/factories/calendarItemChildControllers",
  () => ({
    CalendarItemChildControllersFactory: jest
      .fn()
      .mockImplementation(() => ({ getChildController })),
  })
);

describe("Calendar Items Controller", () => {
  let controller: CalendarItemsController;

  beforeEach(() => {
    controller = new CalendarItemsController();
  });

  it("Should trigger repository selectById method on getById call", async () => {
    await controller.getById(1);
    expect(selectById).toHaveBeenCalledTimes(1);
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

    expect(updateLastDate).toHaveBeenCalledTimes(1);
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
