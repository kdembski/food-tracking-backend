import { IRecipesController } from "@/interfaces/recipes/recipes";
import { RecipesRepository } from "@/repositories/recipes/recipes";
import { RecipesList } from "@/models/recipes/recipesList";
import { RecipesTags } from "@/models/recipes/recipesTags";
import { Recipe } from "@/models/recipes/recipe";
import { RecipeDTO } from "@/interfaces/recipes/recipes";
import { RequestQueryData } from "@/interfaces/helpers/requestQuery";

export class RecipesController implements IRecipesController {
  async getRecipesList(query: RequestQueryData) {
    const recipesList = new RecipesList();
    await recipesList.loadList(query);
    await recipesList.setCookedDatesInCurrentMonth();

    return recipesList;
  }

  async getRecipesTags(query: RequestQueryData) {
    const recipesTags = new RecipesTags();
    await recipesTags.loadTags(query);
    return recipesTags.tags;
  }

  getRecipesNames(searchPhrase: string, tags: string) {
    return new RecipesRepository().selectNames(searchPhrase, tags);
  }

  getRecipesCount(searchPhrase: string, tags?: string) {
    return new RecipesRepository().selectCount(searchPhrase, tags);
  }

  async getRecipeById(id: number) {
    const dto = await new RecipesRepository().selectById(id);
    const recipe = new Recipe(dto);
    return recipe;
  }

  async createRecipe(data: RecipeDTO) {
    const recipe = new Recipe(data);
    const results = await new RecipesRepository().insert(recipe);
    return results;
  }

  async updateRecipe(data: RecipeDTO) {
    const recipe = new Recipe(data);
    const results = await new RecipesRepository().update(recipe);
    return results;
  }

  async deleteRecipe(id: number) {
    const results = await new RecipesRepository().delete(id);
    return results;
  }
}
