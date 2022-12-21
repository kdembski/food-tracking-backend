import { RecipesController } from "@/controllers/recipes/recipes";
import { RecipeDTO } from "@/interfaces/recipes/recipes";
import { CalendarItemChildController } from "@/abstract/controllers/calendarItemChild";
import { Recipe } from "@/models/recipes/recipe";
import { CalendarItemsRepository } from "@/repositories/calendarItems";

export class CalendarItemRecipesController extends CalendarItemChildController<
  Recipe,
  RecipeDTO
> {
  constructor() {
    super(new RecipesController());
  }

  protected getCalendarItemChildDates(
    recipeId: number,
    fromDate: Date,
    toDate: Date
  ) {
    return new CalendarItemsRepository().selectDatesByRecipeId(
      recipeId,
      fromDate,
      toDate
    );
  }

  protected getDate(recipe: Recipe) {
    return recipe.cookedDate;
  }

  protected setDate(recipe: Recipe, date: Date): void {
    recipe.cookedDate = date;
  }
}
