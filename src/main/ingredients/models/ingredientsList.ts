import lodash from "lodash";
import { IngredientsRepository } from "@/repositories/ingredients/ingredients";
import { Ingredient } from "./ingredient";
import {
  IngredientListItemDTO,
  IngredientQueryResult,
} from "@/dtos/ingredients/ingredient";
import { IngredientListItemMapper } from "@/mappers/ingredients/ingredientListItem";
import { IngredientBuilder } from "../builders/ingredient";
import { IngredientsListFilters } from "@/types/ingredients/ingredients";
import { List } from "@/main/_shared/list/models/list";
import { RequestQueryHelper } from "@/helpers/requestQuery";

export class IngredientsList extends List<
  Ingredient,
  IngredientListItemDTO,
  IngredientQueryResult,
  IngredientsListFilters
> {
  private builder: IngredientBuilder;

  constructor(
    repository = new IngredientsRepository(),
    mapper = new IngredientListItemMapper(),
    builder = new IngredientBuilder()
  ) {
    super(repository.list, mapper);
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
