import { IngredientUnitQueryResultMapper } from "@/mappers/ingredients/ingredientUnitQueryResult";
import { IngredientUnitsController } from "@/main/ingredients/controllers/ingredientUnits";
import { IngredientUnitsRepository } from "@/repositories/ingredients/ingredientUnits";
import { IngredientUnitsCollection } from "../collections/ingredientUnits";
import { IngredientUnit } from "../models/ingredientUnit";

export class IngredientUnitsCollectionController {
  async getByIngredientId(ingredientId: number) {
    const dtos = await new IngredientUnitsRepository().selectByIngredientId(
      ingredientId
    );
    const units = dtos.map((dto) =>
      new IngredientUnitQueryResultMapper().toDomain(dto)
    );
    return new IngredientUnitsCollection(units);
  }

  async update(ingredientId?: number, newUnits?: IngredientUnitsCollection) {
    if (!newUnits || !ingredientId) {
      return;
    }

    const controller = new IngredientUnitsController();
    const oldUnits = await this.getByIngredientId(ingredientId);
    const oldUnitIds = oldUnits.items.map((unit) => unit.id);
    const newUnitIds = newUnits.items.map((unit) => unit.id);

    const unitIdsToBeRemoved = oldUnitIds.filter(
      (id) => !newUnitIds.includes(id)
    );

    const promises = newUnits.items.map((item) => {
      if (!item.id) {
        item.ingredientId = ingredientId;
        controller.create(item);
        return;
      }

      controller.update(item);
    });

    const deletePromises = unitIdsToBeRemoved.map((id) => {
      if (!id) {
        return;
      }
      return controller.delete(id);
    });

    await Promise.all([...promises, ...deletePromises]);
  }

  async create(
    units: IngredientUnitsCollection | undefined,
    ingredientId: number
  ) {
    if (!units) {
      return;
    }

    const promises = units.items.map((item) => {
      item.ingredientId = ingredientId;
      return new IngredientUnitsController().create(item);
    });
    await Promise.all(promises);
  }
}
