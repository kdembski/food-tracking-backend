import { IRecipesController } from "@/interfaces/recipes/recipes";
import { RecipesRepository } from "@/repositories/recipes/recipes";
import { Recipe } from "@/main/recipes/models/recipe";
import { RecipeDTO } from "@/interfaces/recipes/recipes";
import { RequestQueryData } from "@/interfaces/helpers/requestQuery";
import { RecipesList } from "../models/recipesList";
import { RecipesTags } from "../models/recipesTags";

export class RecipesController implements IRecipesController {
  async getList(query: RequestQueryData) {
    const recipesList = new RecipesList();
    await recipesList.loadList(query);
    await recipesList.setDatesFromLastYear();

    return recipesList;
  }

  async getTags(query: RequestQueryData) {
    const recipesTags = new RecipesTags();
    await recipesTags.loadTags(query);
    return recipesTags.tags;
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
