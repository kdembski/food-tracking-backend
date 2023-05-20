import { IngredientsRepository } from "@/repositories/ingredients/ingredients";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { IngredientsList } from "../models/ingredientsList";
import { ListBuilder } from "@/base/list/builders/list";
import { IngredientBuilder } from "../builders/ingredient";
import { IngredientUnitsCollectionService } from "./ingredientUnitsCollection";
import { Ingredient } from "../models/ingredient";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { IDbEntityService } from "@/interfaces/base/db-entity/dbEntityService";

export class IngredientsService implements IDbEntityService<Ingredient> {
  async getList(query: RequestQueryData) {
    const { searchPhrase } = new RequestQueryHelper(query);
    const ingredientsList = new IngredientsList();
    const listBuilder = new ListBuilder(ingredientsList);
    await listBuilder.build(query, { searchPhrase });

    return ingredientsList;
  }

  getOptions() {
    return new IngredientsRepository().selectOptions();
  }

  async getById(id: number) {
    const dto = await new IngredientsRepository().selectById(id);
    const builder = new IngredientBuilder(dto);
    await builder.produceUnits();
    return builder.getIngredient();
  }

  async create(ingredient: Ingredient) {
    const results = await new IngredientsRepository().insert(ingredient);
    new IngredientUnitsCollectionService().create(
      ingredient.units,
      results.insertId
    );

    return results;
  }

  async update(ingredient: Ingredient) {
    await new IngredientUnitsCollectionService().update(
      ingredient.units,
      ingredient.id
    );
    return new IngredientsRepository().update(ingredient);
  }

  delete(id: number) {
    return new IngredientsRepository().delete(id);
  }
}
