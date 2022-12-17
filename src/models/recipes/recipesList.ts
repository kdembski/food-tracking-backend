import { RecipesRepository } from "../../repositories/recipes/recipes";
import { Recipe } from "./recipe";
import { RecipeDTO } from "@/interfaces/recipes/recipes";
import { List } from "@/abstract/models/list";
import { RecipesController } from "@/controllers/recipes/recipes";
import { CalendarItemRecipesController } from "@/controllers/calendar/calendarItemRecipes";

export class RecipesList extends List<Recipe, RecipeDTO> {
  protected async getListData(
    searchPhrase: string,
    sortAttribute: string,
    sortDirection: string,
    tags: string,
    size: number,
    offset: number
  ) {
    return new RecipesRepository().selectList(
      searchPhrase,
      sortAttribute,
      sortDirection,
      tags,
      size,
      offset
    );
  }

  protected getListCount(searchPhrase: string, tags: string): Promise<number> {
    return new RecipesController().getRecipesCount(searchPhrase, tags);
  }

  protected createListItem(data: RecipeDTO) {
    return new Recipe(data);
  }

  async setCookedDatesInCurrentMonth() {
    const promises = this.iterate(async (item) => {
      if (!item.id) {
        return;
      }

      item.cookedDatesInCurrentMonth =
        await new CalendarItemRecipesController().getDatesInCurrentMonth(
          item.id
        );
    });

    if (!promises) {
      return;
    }

    await Promise.all(promises);
  }
}