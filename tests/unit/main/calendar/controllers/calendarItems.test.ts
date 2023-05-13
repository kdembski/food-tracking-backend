import { CalendarItemsController } from "@/main/calendar/controllers/calendarItems";
import { CalendarItem } from "@/main/calendar/models/calendarItem";
import { CalendarDaysMapper } from "@/mappers/calendar/calendarDays";
import { clone } from "lodash";

const selectAllResult = [
  {
    id: 1,
    date: new Date(2000, 1, 1),
    recipeId: 1,
    recipeName: "name1",
    recipeTags: "tag1",
    sortOrder: 1,
    memberIds: "1",
  },
  {
    id: 2,
    date: new Date(2000, 1, 1),
    recipeId: 2,
    recipeName: "name2",
    recipeTags: "tag2",
    sortOrder: 2,
    memberIds: "1",
  },
  {
    id: 3,
    date: new Date(2000, 1, 2),
    recipeId: 3,
    recipeName: "name3",
    recipeTags: "tag3",
    sortOrder: 3,
    memberIds: "1,2",
  },
  {
    id: 4,
    date: new Date(2000, 1, 2),
    recipeId: 4,
    recipeName: "name4",
    recipeTags: "tag4",
    sortOrder: 4,
    memberIds: "2",
  },
];

const insert = jest
  .fn()
  .mockImplementation(() => Promise.resolve({ insertId: 1 }));
const update = jest.fn();
const selectById = jest.fn().mockImplementation(() => ({ recipeId: 1 }));
const _delete = jest.fn();
const selectAll = jest.fn().mockImplementation(() => clone(selectAllResult));

jest.mock("@/repositories/calendarItems", () => ({
  CalendarItemsRepository: jest.fn().mockImplementation(() => ({
    insert,
    update,
    selectById,
    delete: _delete,
    selectAll,
  })),
}));

const addCalendarItemToMembers = jest.fn();
jest.mock("@/main/calendar/controllers/calendarItemMembers", () => ({
  CalendarItemMembersController: jest
    .fn()
    .mockImplementation(() => ({ addCalendarItemToMembers })),
}));

const updateOrderedFoodLastDate = jest.fn();
jest.mock("@/main/calendar/controllers/calendarItemOrderedFood", () => ({
  CalendarItemOrderedFoodController: jest
    .fn()
    .mockImplementation(() => ({ updateLastDate: updateOrderedFoodLastDate })),
}));

const updateRecipesLastDate = jest.fn();
jest.mock("@/main/calendar/controllers/calendarItemRecipes", () => ({
  CalendarItemRecipesController: jest
    .fn()
    .mockImplementation(() => ({ updateLastDate: updateRecipesLastDate })),
}));

describe("Calendar Items Controller", () => {
  let controller: CalendarItemsController;

  beforeEach(() => {
    controller = new CalendarItemsController();
  });

  it("Should calendar items grouped by days", async () => {
    const calendarDays = await controller.getDays(
      new Date(2000, 1, 0),
      new Date(2000, 1, 3),
      [1]
    );
    expect(new CalendarDaysMapper().toDTO(calendarDays.items)).toEqual([
      {
        date: new Date(2000, 1, 1),
        items: [
          {
            id: 1,
            date: new Date(2000, 1, 1),
            recipeId: 1,
            orderedFoodId: undefined,
            name: "name1",
            tags: "tag1",
            sortOrder: 1,
            members: [1],
          },
          {
            id: 2,
            date: new Date(2000, 1, 1),
            recipeId: 2,
            orderedFoodId: undefined,
            name: "name2",
            tags: "tag2",
            sortOrder: 2,
            members: [1],
          },
        ],
      },
      {
        date: new Date(2000, 1, 2),
        items: [
          {
            id: 3,
            date: new Date(2000, 1, 2),
            recipeId: 3,
            orderedFoodId: undefined,
            name: "name3",
            tags: "tag3",
            sortOrder: 3,
            members: [1, 2],
          },
        ],
      },
    ]);
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
      orderedFoodId: undefined,
    };

    const item = new CalendarItem(dto);
    await controller.create(item);

    expect(insert).toHaveBeenCalledWith(item);
    expect(addCalendarItemToMembers).toHaveBeenCalledWith(1, [1, 2]);
  });

  it("Should trigger repository update on update method", async () => {
    const date = new Date(2000, 0, 0);
    const item = new CalendarItem({ date, recipeId: 1 });
    await controller.update(item);

    expect(update).toHaveBeenCalledWith(new CalendarItem(item));
  });

  it("Should trigger repository delete on delete method", async () => {
    const date = new Date(2000, 0, 0);
    await controller.delete(1);

    expect(_delete).toHaveBeenCalledWith(1);
    expect(selectById).toHaveBeenCalledWith(1);
  });

  it("Should update last date for linked item", async () => {
    const dto: {
      date: Date;
      members: number[];
      recipeId?: number;
      orderedFoodId?: number;
    } = {
      date: new Date(2000, 0, 0),
      members: [1, 2],
      recipeId: 1,
      orderedFoodId: undefined,
    };

    await controller.create(new CalendarItem(dto));
    expect(updateRecipesLastDate).toHaveBeenCalledTimes(1);

    dto.recipeId = undefined;
    dto.orderedFoodId = 1;
    await controller.create(new CalendarItem(dto));
    expect(updateOrderedFoodLastDate).toHaveBeenCalledTimes(1);
  });
});
