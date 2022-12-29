import { ListConfig } from "@/interfaces/base/list";
import { IngredientsRepository } from "@/repositories/ingredients/ingredients";
import { IngredientDTO } from "@/interfaces/ingredients/ingredients";
import { List } from "@/base/list/models/list";
import { Ingredient } from "./ingredient";
import { IngredientsController } from "../controllers/ingredients";

export class IngredientsList extends List<Ingredient, IngredientDTO> {
  async getListData(config: ListConfig) {
    return new IngredientsRepository().selectList(config);
  }

  getListCount(searchPhrase: string, tags: string): Promise<number> {
    return new IngredientsController().getCount(searchPhrase, tags);
  }

  createListItem(data: IngredientDTO) {
    return new Ingredient(data);
  }

  async setUnitNames() {
    const promises = this.iterate(async (item) => {
      return item.loadUnitNames();
    });

    if (!promises) {
      return;
    }

    await Promise.all(promises);
  }
}
