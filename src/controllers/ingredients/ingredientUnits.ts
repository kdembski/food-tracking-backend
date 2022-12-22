import {
  IIngredientUnitsController,
  IngredientUnitDTO,
} from "@/interfaces/ingredients/ingredientUnits";
import { IngredientUnit } from "@/models/ingredients/ingredientUnit";
import { IngredientUnitsRepository } from "@/repositories/ingredients/ingredientUnits";

export class IngredientUnitsController implements IIngredientUnitsController {
  async getById(id: number) {
    const dto = await new IngredientUnitsRepository().selectById(id);
    return new IngredientUnit(dto);
  }

  async getByIngredientId(ingredientId: number) {
    const dtos = await new IngredientUnitsRepository().selectByIngredientId(
      ingredientId
    );
    return dtos.map((dto) => new IngredientUnit(dto));
  }

  async getUnitNamesByIngredientId(ingredientId: number) {
    const ingredientUnits = await this.getByIngredientId(ingredientId);
    return ingredientUnits
      .map((item) => item.unitName)
      .filter((name): name is string => !!name);
  }

  create(data: IngredientUnitDTO) {
    const ingredient = new IngredientUnit(data);
    return new IngredientUnitsRepository().insert(ingredient);
  }

  update(data: IngredientUnitDTO) {
    const ingredient = new IngredientUnit(data);
    return new IngredientUnitsRepository().update(ingredient);
  }

  delete(id: number) {
    return new IngredientUnitsRepository().delete(id);
  }
}
