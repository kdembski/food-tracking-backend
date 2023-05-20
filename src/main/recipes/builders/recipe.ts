import { ExtendedRecipeDTO } from "@/dtos/recipes/recipe";
import { CalendarItemRecipesService } from "@/main/calendar/services/calendarItemRecipes";
import { Recipe } from "@/main/recipes/models/recipe";

export class RecipeBuilder {
  private recipe: Recipe;

  constructor(data: ExtendedRecipeDTO) {
    this.recipe = new Recipe(data);
  }

  async produceDatesFromLastYear() {
    if (!this.recipe.id) {
      return;
    }

    this.recipe.datesFromLastYear = await new CalendarItemRecipesService(
      this.recipe.id
    ).getDatesFromLastYear();
  }

  getRecipe() {
    return this.recipe;
  }
}
