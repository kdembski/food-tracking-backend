import { IngredientsRepository } from "@/repositories/ingredients/ingredients";
import { List } from "@/base/list/models/list";
import { Ingredient } from "./ingredient";
import {
  IngredientListItemDTO,
  IngredientQueryResult,
} from "@/dtos/ingredients/ingredient";
import { IngredientListItemMapper } from "../mappers/ingredientListItem";
import { IngredientBuilder } from "../builders/ingredient";

export class IngredientsList extends List<
  Ingredient,
  IngredientListItemDTO,
  IngredientQueryResult
> {
  constructor() {
    super(new IngredientsRepository(), new IngredientListItemMapper());
  }

  async createListItem(data: IngredientQueryResult) {
    const builder = new IngredientBuilder(data);
    await builder.buildUnits();
    return builder.getIngredient();
  }
}
