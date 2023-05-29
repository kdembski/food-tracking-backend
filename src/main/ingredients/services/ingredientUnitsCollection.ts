import { IngredientUnitsRepository } from "@/repositories/ingredients/ingredientUnits";
import { IngredientUnitsCollection } from "../collections/ingredientUnits";
import { IngredientUnit } from "../models/ingredientUnit";
import { IngredientUnitsService } from "./ingredientUnits";
import { CRUDCollectionService } from "@/main/_shared/crud/services/crudCollection";
import { IngredientUnitQueryResultCollectionMapper } from "@/mappers/ingredients/ingredientUnitQueryResultsCollection";

export class IngredientUnitsCollectionService extends CRUDCollectionService<
  IngredientUnit,
  IngredientUnitsCollection
> {
  protected service: IngredientUnitsService;
  private repository: IngredientUnitsRepository;
  private collectionMapper: IngredientUnitQueryResultCollectionMapper;

  constructor(
    service = new IngredientUnitsService(),
    repository = new IngredientUnitsRepository(),
    collectionMapper = new IngredientUnitQueryResultCollectionMapper()
  ) {
    super(service);
    this.service = service;
    this.repository = repository;
    this.collectionMapper = collectionMapper;
  }

  async getByIngredientId(ingredientId: number) {
    const dtos = await this.repository.selectByIngredientId(ingredientId);
    return this.collectionMapper.toDomain(dtos);
  }

  getCollection(selectorId: number) {
    return this.getByIngredientId(selectorId);
  }

  setSelectorId(item: IngredientUnit, selectorId: number) {
    item.ingredientId = selectorId;
  }
}
