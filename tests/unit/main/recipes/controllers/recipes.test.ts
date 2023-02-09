import { RecipesController } from "@/main/recipes/controllers/recipes";
import { Recipe } from "@/main/recipes/models/recipe";

const selectNames = jest.fn();
const selectCount = jest.fn().mockImplementation(() => 10);
const selectById = jest.fn().mockImplementation(() => ({}));
const insert = jest.fn();
const update = jest.fn();
const _delete = jest.fn();
const selectList = jest.fn().mockImplementation(() => [{ id: 1 }]);
const selectTags = jest.fn().mockImplementation(() => ["tag1,tag2"]);

jest.mock("@/repositories/recipes/recipes", () => ({
  RecipesRepository: jest.fn().mockImplementation(() => ({
    selectNames,
    selectCount,
    selectById,
    insert,
    update,
    delete: _delete,
    selectList,
    selectTags,
  })),
}));

const getDatesFromLastYear = jest.fn();
jest.mock("@/main/calendar/controllers/calendarItemRecipes", () => ({
  CalendarItemRecipesController: jest.fn().mockImplementation(() => ({
    getDatesFromLastYear,
  })),
}));

describe("Recipes Controller", () => {
  let controller: RecipesController;

  beforeEach(() => {
    controller = new RecipesController();
  });

  it("Should trigger loadList from recipesList on getList call", async () => {
    expect((await controller.getList({})).toDTO()).toEqual({
      data: [
        {
          cookedDate: undefined,
          cookidooLink: undefined,
          datesFromLastYear: undefined,
          id: 1,
          kcal: undefined,
          preparationTime: undefined,
          recipeName: undefined,
          tags: undefined,
        },
      ],
      pagination: {
        currentPage: 1,
        firstRecord: 1,
        lastRecord: 1,
        totalPages: 1,
        totalRecords: 10,
      },
    });
    expect(selectList).toHaveBeenCalledTimes(1);
  });

  it("Should trigger loadTags from recipesTags on getTags call", async () => {
    await controller.getTags({});
    expect(selectTags).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectNames on getNames call", async () => {
    await controller.getNames("", "");
    expect(selectNames).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectCount on getCount call", async () => {
    await controller.getCount("", "");
    expect(selectCount).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository selectById on getById call", async () => {
    await controller.getById(1);
    expect(selectById).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on create call", async () => {
    await controller.create(new Recipe({ id: 1 }));
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update call", async () => {
    await controller.update(new Recipe({ id: 1 }));
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on delete call", async () => {
    await controller.delete(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });
});
