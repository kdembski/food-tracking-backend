import { IngredientUnit } from "@/main/ingredients/models/ingredientUnit";
import { BaseRepository } from "../_shared/base";
import { IngredientUnitQueryResult } from "@/dtos/ingredients/ingredientUnit";
import { Database } from "@/config/database";
import { IngredientUnitsQueries } from "@/queries/ingredients/ingredientUnits";

export class IngredientUnitsRepository extends BaseRepository<
  IngredientUnit,
  IngredientUnitQueryResult
> {
  protected queries: IngredientUnitsQueries;

  constructor(
    database = Database.getInstance(),
    queries = new IngredientUnitsQueries()
  ) {
    super(database, queries);
    this.queries = queries;
  }

  async selectByIngredientId(ingredientId: number) {
    const query = this.queries.getSelectByIngredientId();
    const results = await this.database.sendQuery(query, [ingredientId]);

    return results as IngredientUnitQueryResult[];
  }

  async selectByIngredientIdAndUnitId(ingredientId: number, unitId: number) {
    const query = this.queries.getSelectByIngredientIdAndUnitId(
      ingredientId,
      unitId
    );

    const results = await this.database.sendQuery(query);
    return results[0] as IngredientUnitQueryResult;
  }

  getFieldsToInsert(model: IngredientUnit) {
    return [
      model.ingredientId,
      model.unitId,
      model.kcalPerUnit,
      model.isPrimary,
      model.converterToPrimary,
    ];
  }

  getFieldsToUpdate(model: IngredientUnit) {
    return [
      model.ingredientId,
      model.unitId,
      model.kcalPerUnit,
      model.isPrimary,
      model.converterToPrimary,
      model.id,
    ];
  }
}
