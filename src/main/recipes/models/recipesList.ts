import { Recipe } from "./recipe";
import { List } from "@/base/list/models/list";
import { RecipeDTO } from "@/dtos/recipes/recipe";
import { RecipesRepository } from "@/repositories/recipes/recipes";

export class RecipesList extends List<Recipe, RecipeDTO> {
  constructor() {
    super(new RecipesRepository());
  }

  createListItem(data: RecipeDTO) {
    return new Recipe(data);
  }

  async setDatesFromLastYear() {
    const promises = this.data.map(async (item) => {
      return item.setDatesFromLastYear();
    });

    if (!promises) {
      return;
    }

    await Promise.all(promises);
  }
}
