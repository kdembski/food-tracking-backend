import { RecipesRepository } from "@/repositories/recipes/recipes";
import { Recipe } from "./recipe";
import { List } from "@/base/list/models/list";
import { ListConfig } from "@/types/base/list";
import { RecipesController } from "../controllers/recipes";
import { RecipeDTO } from "@/dtos/recipes/recipe";

export class RecipesList extends List<Recipe, RecipeDTO> {
  async getListData(config: ListConfig) {
    return new RecipesRepository().selectList(config);
  }

  getListCount(searchPhrase: string, tags: string): Promise<number> {
    return new RecipesController().getCount(searchPhrase, tags);
  }

  createIListItem(data: RecipeDTO) {
    return new Recipe(data);
  }

  async setDatesFromLastYear() {
    const promises = this.iterate(async (item) => {
      return item.setDatesFromLastYear();
    });

    if (!promises) {
      return;
    }

    await Promise.all(promises);
  }
}
