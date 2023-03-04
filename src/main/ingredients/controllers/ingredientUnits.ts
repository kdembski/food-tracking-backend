import { IIngredientUnitsController } from "@/interfaces/ingredients/ingredientUnits";
import { IngredientUnitsRepository } from "@/repositories/ingredients/ingredientUnits";
import { IngredientUnitQueryResultMapper } from "@/mappers/ingredients/ingredientUnitQueryResult";
import { IngredientUnit } from "../models/ingredientUnit";

export class IngredientUnitsController implements IIngredientUnitsController {
  async getById(id: number) {
    const dto = await new IngredientUnitsRepository().selectById(id);
    return new IngredientUnitQueryResultMapper().toDomain(dto);
  }

  async getByIngredientIdAndUnitId(ingredientId: number, unitId: number) {
    const dto =
      await new IngredientUnitsRepository().selectByIngredientIdAndUnitId(
        ingredientId,
        unitId
      );
    return new IngredientUnitQueryResultMapper().toDomain(dto);
  }

  create(unit: IngredientUnit) {
    return new IngredientUnitsRepository().insert(unit);
  }

  update(unit: IngredientUnit) {
    return new IngredientUnitsRepository().update(unit);
  }

  delete(id: number) {
    return new IngredientUnitsRepository().delete(id);
  }
}
