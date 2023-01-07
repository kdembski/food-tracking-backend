import { IngredientMapper } from "./../mappers/ingredient";
import { IngredientsRepository } from "@/repositories/ingredients/ingredients";
import { List } from "@/base/list/models/list";
import { Ingredient } from "./ingredient";
import { IngredientDTO } from "@/dtos/ingredients/ingredient";

export class IngredientsList extends List<Ingredient, IngredientDTO> {
  constructor() {
    super(new IngredientsRepository(), new IngredientMapper());
  }

  createListItem(data: IngredientDTO) {
    return new Ingredient(data);
  }

  async setUnitNames() {
    const promises = this.data.map(async (item) => {
      return item.loadUnitNames();
    });

    if (!promises) {
      return;
    }

    await Promise.all(promises);
  }
}
