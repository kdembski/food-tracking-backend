import { CalendarItem } from "@/main/calendar/models/calendarItem";
import { CustomError } from "@/_shared/errors/models/customError";
import { CalendarItemChildService } from "../services/calendarItemChild";
import { CalendarItemRecipeAdapter } from "../adapters/calendarItemRecipe";
import { RecipesService } from "@/main/recipes/services/recipes";
import { CalendarItemRecipeDatesManager } from "../managers/calendarItemRecipes";
import { CalendarItemOrderedFoodAdapter } from "../adapters/calendarItemOrderedFood";
import { OrderedFoodService } from "@/main/ordered-food/services/orderedFood";
import { CalendarItemOrderedFoodDatesManager } from "../managers/calendarItemOrderedFood";

export class CalendarItemChildConfigFactory {
  createChildConfig(calendarItem: CalendarItem) {
    if (calendarItem.recipeId) {
      return {
        service: new CalendarItemChildService(
          new CalendarItemRecipeAdapter(),
          new RecipesService(),
          new CalendarItemRecipeDatesManager()
        ),
        id: calendarItem.recipeId,
      };
    }

    if (calendarItem.orderedFoodId) {
      return {
        service: new CalendarItemChildService(
          new CalendarItemOrderedFoodAdapter(),
          new OrderedFoodService(),
          new CalendarItemOrderedFoodDatesManager()
        ),
        id: calendarItem.orderedFoodId,
      };
    }

    throw new CustomError({ message: "Calendar item child is missing" });
  }
}
