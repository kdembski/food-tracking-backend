import { RecipeDTO } from "@/interfaces/recipes/recipes";
import { RecipesController } from "@/main/recipes/controllers/recipes";
import { Recipe } from "@/main/recipes/models/recipe";
import { CalendarItemsRepository } from "@/repositories/calendarItems";
import { CalendarItemRecipeAdapter } from "../adapters/calendarItemRecipe";
import { CalendarItemChildController } from "./calendarItemChild";

export class CalendarItemRecipesController extends CalendarItemChildController<
  Recipe,
  RecipeDTO
> {
  constructor(recipeId: number) {
    super(new RecipesController(), recipeId);
  }

  getCalendarItemChildDates(fromDate: Date, toDate: Date) {
    return new CalendarItemsRepository().selectDatesByRecipeId(
      this.childId,
      fromDate,
      toDate
    );
  }

  async getAdaptedCalendarItemChild() {
    const recipe = await this.childController.getById(this.childId);
    return new CalendarItemRecipeAdapter(recipe);
  }
}
