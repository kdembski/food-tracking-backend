import { ListBuilder } from "@/base/list/builders/list";
import { IRecipesController } from "@/interfaces/recipes/recipes";
import { RecipesRepository } from "@/repositories/recipes/recipes";
import { Recipe } from "@/main/recipes/models/recipe";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { RecipesList } from "../models/recipesList";
import { RecipesTags } from "../models/recipesTags";
import { TagsBuilder } from "@/base/tags/builders/tags";
import { RecipeDTO } from "@/dtos/recipes/recipe";
import { TagsMapper } from "@/base/tags/mappers/tags";

export class RecipesController implements IRecipesController {
  async getList(query: RequestQueryData) {
    const recipesList = new RecipesList();
    const listBuilder = new ListBuilder(recipesList);
    await listBuilder.build(query);
    await recipesList.setDatesFromLastYear();

    return recipesList;
  }

  async getTags(query: RequestQueryData) {
    const recipesTags = new RecipesTags();
    const tagsBuilder = new TagsBuilder(recipesTags);
    await tagsBuilder.build(query);
    return recipesTags;
  }

  getNames(searchPhrase: string, tags?: string) {
    return new RecipesRepository().selectNames(searchPhrase, tags);
  }

  getCount(searchPhrase: string, tags?: string) {
    return new RecipesRepository().selectCount(searchPhrase, tags);
  }

  async getById(id: number) {
    const dto = await new RecipesRepository().selectById(id);
    return new Recipe(dto);
  }

  create(data: RecipeDTO) {
    const recipe = new Recipe(data);
    return new RecipesRepository().insert(recipe);
  }

  update(data: RecipeDTO) {
    const recipe = new Recipe(data);
    return new RecipesRepository().update(recipe);
  }

  delete(id: number) {
    return new RecipesRepository().delete(id);
  }
}
