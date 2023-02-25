import { IngredientUnitQueryResultMapper } from "@/mappers/ingredients/ingredientUnitQueryResult";
import { IngredientUnitsRepository } from "@/repositories/ingredients/ingredientUnits";
import { IngredientUnitsCollection } from "../collections/ingredientUnits";
import { IngredientUnit } from "../models/ingredientUnit";
import { DBEntityCollectionController } from "@/base/db-entity/controllers/collection";
import { IngredientUnitsController } from "./ingredientUnits";

export class IngredientUnitsCollectionController extends DBEntityCollectionController<
  IngredientUnit,
  IngredientUnitsCollection
> {
  constructor() {
    super(new IngredientUnitsController());
  }

  async getByIngredientId(ingredientId: number) {
    const dtos = await new IngredientUnitsRepository().selectByIngredientId(
      ingredientId
    );
    const units = dtos.map((dto) =>
      new IngredientUnitQueryResultMapper().toDomain(dto)
    );
    return new IngredientUnitsCollection(units);
  }

  getCollection(selectorId: number) {
    return this.getByIngredientId(selectorId);
  }

  setSelectorId(item: IngredientUnit, selectorId: number) {
    item.ingredientId = selectorId;
  }
}
