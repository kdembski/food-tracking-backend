import { RecipeDTO } from "@/dtos/recipes/recipe";
import { RecipesController } from "@/main/recipes/controllers/recipes";
import { RecipeMapper } from "@/main/recipes/mappers/recipe";
import { Recipe } from "@/main/recipes/models/recipe";
import { CalendarItemsRepository } from "@/repositories/calendarItems";
import { CalendarItemRecipeAdapter } from "../adapters/calendarItemRecipe";
import { CalendarItemChildController } from "./calendarItemChild";

export class CalendarItemRecipesController extends CalendarItemChildController<
  Recipe,
  RecipeDTO
> {
  constructor(recipeId: number) {
    super(
      new RecipesController(),
      new RecipeMapper(),
      new CalendarItemRecipeAdapter(recipeId),
      recipeId
    );
  }

  getCalendarItemChildDates(fromDate: Date, toDate: Date) {
    return new CalendarItemsRepository().selectDatesByRecipeId(
      this.childId,
      fromDate,
      toDate
    );
  }
}
