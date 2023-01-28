import { RecipesController } from "@/main/recipes/controllers/recipes";
import { Recipe } from "@/main/recipes/models/recipe";

const selectNames = jest.fn();
const selectCount = jest.fn();
const selectById = jest.fn().mockImplementation(() => ({}));
const insert = jest.fn();
const update = jest.fn();
const _delete = jest.fn();

jest.mock("@/repositories/recipes/recipes", () => ({
  RecipesRepository: jest.fn().mockImplementation(() => ({
    selectNames,
    selectCount,
    selectById,
    insert,
    update,
    delete: _delete,
  })),
}));

const buildList = jest.fn();
const setDatesFromLastYear = jest.fn();

jest.mock("@/main/recipes/models/recipesList", () => ({
  RecipesList: jest.fn().mockImplementation(() => ({
    setDatesFromLastYear,
  })),
}));

jest.mock("@/base/list/builders/list", () => ({
  ListBuilder: jest.fn().mockImplementation(() => ({
    build: buildList,
  })),
}));

const buildTags = jest.fn();
jest.mock("@/base/tags/builders/tags", () => ({
  TagsBuilder: jest.fn().mockImplementation(() => ({
    build: buildTags,
  })),
}));

describe("Recipes Controller", () => {
  let controller: RecipesController;

  beforeEach(() => {
    controller = new RecipesController();
  });

  it("Should trigger loadList from recipesList on getList call", async () => {
    await controller.getList({});
    expect(buildList).toHaveBeenCalledTimes(1);
  });

  it("Should trigger loadTags from recipesTags on getTags call", async () => {
    await controller.getTags({});
    expect(buildTags).toHaveBeenCalledTimes(1);
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
    await controller.create(new Recipe({}));
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository update on update call", async () => {
    await controller.update(new Recipe({}));
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("Should trigger repository insert on delete call", async () => {
    await controller.delete(1);
    expect(_delete).toHaveBeenCalledTimes(1);
  });
});
