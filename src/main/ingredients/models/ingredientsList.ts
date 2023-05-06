import { IngredientsRepository } from "@/repositories/ingredients/ingredients";
import { List } from "@/base/list/models/list";
import { Ingredient } from "./ingredient";
import {
  IngredientListItemDTO,
  IngredientQueryResult,
} from "@/dtos/ingredients/ingredient";
import { IngredientListItemMapper } from "@/mappers/ingredients/ingredientListItem";
import { IngredientBuilder } from "../builders/ingredient";
import { IngredientsListFilters } from "@/types/ingredients/ingredients";

export class IngredientsList extends List<
  Ingredient,
  IngredientListItemDTO,
  IngredientQueryResult,
  IngredientsListFilters
> {
  constructor() {
    super(new IngredientsRepository(), new IngredientListItemMapper());
  }

  async createListItem(data: IngredientQueryResult) {
    const builder = new IngredientBuilder(data);
    await builder.produceUnits();
    return builder.getIngredient();
  }
}
