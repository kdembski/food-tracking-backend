import { IngredientUnitsRepository } from "@/repositories/ingredients/ingredientUnits";
import { IngredientUnitQueryResultMapper } from "@/mappers/ingredients/ingredientUnitQueryResult";
import { IngredientUnit } from "../models/ingredientUnit";
import { IngredientUnitQueryResult } from "@/dtos/ingredients/ingredientUnit";
import { CRUDService } from "@/main/_shared/crud/services/crud";
import { UpdateKcalForRecipeContainingIngredientUnit } from "@/main/recipes/services/recipe-ingredients-collection/updateKcalForRecipeContainingIngredientUnit";

export class IngredientUnitsService extends CRUDService<
  IngredientUnit,
  IngredientUnitQueryResult
> {
  protected repository: IngredientUnitsRepository;
  protected mapper: IngredientUnitQueryResultMapper;

  constructor(
    repository = new IngredientUnitsRepository(),
    mapper = new IngredientUnitQueryResultMapper()
  ) {
    super(repository, mapper);
    this.repository = repository;
    this.mapper = mapper;
  }

  async getByIngredientIdAndUnitId(ingredientId: number, unitId: number) {
    const dto = await this.repository.selectByIngredientIdAndUnitId(
      ingredientId,
      unitId
    );
    return this.mapper.toDomain(dto);
  }

  update(unit: IngredientUnit) {
    new UpdateKcalForRecipeContainingIngredientUnit().execute(unit);
    return super.update(unit);
  }
}
