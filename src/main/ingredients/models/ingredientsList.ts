import lodash from "lodash";
import { Ingredient } from "./ingredient";
import { IngredientQueryResult } from "@/dtos/ingredients/ingredient";
import { IngredientBuilder } from "../builders/ingredient";
import { IngredientsListFilters } from "@/types/ingredients/ingredients";
import { List } from "@/main/_shared/list/models/list";
import { RequestQueryHelper } from "@/helpers/requestQuery";

export class IngredientsList extends List<
  Ingredient,
  IngredientQueryResult,
  IngredientsListFilters
> {
  private builder: IngredientBuilder;

  constructor(builder = new IngredientBuilder()) {
    super();
    this.builder = builder;
  }

  async createListItem(data: IngredientQueryResult) {
    const builder = lodash.clone(this.builder);
    builder.ingredient = new Ingredient(data);
    await builder.produceUnits();
    return builder.ingredient;
  }

  createFilters(query: RequestQueryHelper) {
    const { searchPhrase } = query;
    return { searchPhrase };
  }
}
