import { RecipesRepository } from "@/repositories/recipes/recipes";
import { Recipe } from "./recipe";
import { RecipeDTO } from "@/interfaces/recipes/recipes";
import { List } from "@/abstract/models/list";
import { RecipesController } from "@/controllers/recipes/recipes";
import { ListConfig } from "@/interfaces/base/list";

export class RecipesList extends List<Recipe, RecipeDTO> {
  protected async getListData(config: ListConfig) {
    return new RecipesRepository().selectList(config);
  }

  protected getListCount(searchPhrase: string, tags: string): Promise<number> {
    return new RecipesController().getCount(searchPhrase, tags);
  }

  protected createListItem(data: RecipeDTO) {
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
