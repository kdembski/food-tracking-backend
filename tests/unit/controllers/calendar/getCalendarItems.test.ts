import { GetCalendarItemsController } from "@/controllers/calendar/getCalendarItems";

const dtos = [
  {
    date: new Date(2000, 0, 0),
    members: [1],
    recipeId: 1,
  },
  {
    date: new Date(2000, 0, 0),
    members: [1],
    recipeId: 1,
  },
  {
    date: new Date(2000, 0, 1),
    members: [1],
    orderedFoodId: 1,
  },
  {
    date: new Date(2000, 0, 1),
    members: [2],
    orderedFoodId: 1,
  },
];
const selectAll = jest.fn().mockImplementation(() => dtos);
jest.mock("@/repositories/calendarItems", () => ({
  CalendarItemsRepository: jest.fn().mockImplementation(() => ({
    selectAll,
  })),
}));

jest.mock("@/models/calendarItem", () => ({
  CalendarItem: jest
    .fn()
    .mockImplementation((data) => ({ ...data, loadMembers: jest.fn() })),
}));

const getOrderedFoodById = jest.fn().mockImplementation(() => ({
  id: 1,
  foodName: "test food name",
  tags: "tag1",
}));
jest.mock("@/controllers/orderedFood", () => ({
  OrderedFoodController: jest.fn().mockImplementation(() => ({
    getById: getOrderedFoodById,
  })),
}));

const getRecipeById = jest.fn().mockImplementation(() => ({
  id: 1,
  recipeName: "test recipe name",
  tags: "tag1",
}));
jest.mock("@/controllers/recipes/recipes", () => ({
  RecipesController: jest.fn().mockImplementation(() => ({
    getById: getRecipeById,
  })),
}));

describe("Get Calendar Items Controller", () => {
  let controller: GetCalendarItemsController;

  beforeEach(() => {
    controller = new GetCalendarItemsController();
  });

  it("Should get filtered calendar days on getCalendarItems call", async () => {
    expect(await controller.getDays(new Date(), new Date(), [1])).toEqual([
      {
        date: new Date(2000, 0, 0),
        items: [
          {
            id: undefined,
            isRecipe: true,
            members: [1],
            name: "test recipe name",
            recipeId: 1,
            sortOrder: undefined,
            tags: "tag1",
          },
          {
            id: undefined,
            isRecipe: true,
            members: [1],
            name: "test recipe name",
            recipeId: 1,
            sortOrder: undefined,
            tags: "tag1",
          },
        ],
      },
      {
        date: new Date(2000, 0, 1),
        items: [
          {
            id: undefined,
            isOrderedFood: true,
            members: [1],
            name: "test food name",
            orderedFoodId: 1,
            sortOrder: undefined,
            tags: "tag1",
          },
        ],
      },
    ]);
  });

  it("Should throw error if calendar item child is not found", async () => {
    selectAll.mockImplementationOnce(() => [
      {},
      { date: new Date(2000, 0, 0) },
    ]);

    expect.assertions(1);
    try {
      await controller.getDays(new Date(), new Date());
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
