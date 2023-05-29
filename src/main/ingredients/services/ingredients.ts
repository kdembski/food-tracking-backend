import { DbEntityService } from "@/main/_shared/db-entity/services/dbEntity";
import { Ingredient } from "../models/ingredient";
import { IngredientDTO } from "@/dtos/ingredients/ingredient";
import { IngredientsRepository } from "@/repositories/ingredients/ingredients";
import { IngredientMapper } from "@/mappers/ingredients/ingredient";
import { ListService } from "@/main/_shared/list/listService";
import { IngredientsListFilters } from "@/types/ingredients/ingredients";
import { IngredientsList } from "../models/ingredientsList";
import { IngredientBuilder } from "../builders/ingredient";
import { IngredientUnitsCollectionService } from "./ingredientUnitsCollection";

export class IngredientsService extends DbEntityService<
  Ingredient,
  IngredientDTO
> {
  private ingredientUnitsCollectionService: IngredientUnitsCollectionService;
  private builder: IngredientBuilder;
  protected repository: IngredientsRepository;
  protected mapper: IngredientMapper;
  list: ListService<
    Ingredient,
    IngredientDTO,
    IngredientDTO,
    IngredientsListFilters
  >;

  constructor(
    repository = new IngredientsRepository(),
    mapper = new IngredientMapper(),
    list = new ListService(new IngredientsList()),
    ingredientUnitsCollectionService = new IngredientUnitsCollectionService(),
    builder = new IngredientBuilder()
  ) {
    super(repository, mapper);
    this.repository = repository;
    this.mapper = mapper;
    this.list = list;
    this.ingredientUnitsCollectionService = ingredientUnitsCollectionService;
    this.builder = builder;
  }

  getOptions() {
    return this.repository.selectOptions();
  }

  async getById(id: number) {
    const ingredient = await super.getById(id);
    this.builder.ingredient = ingredient;
    await this.builder.produceUnits();

    return this.builder.ingredient;
  }

  async create(ingredient: Ingredient) {
    const results = await super.create(ingredient);
    await this.ingredientUnitsCollectionService.create(
      ingredient.units,
      results.insertId
    );

    return results;
  }

  async update(ingredient: Ingredient) {
    await this.ingredientUnitsCollectionService.update(
      ingredient.units,
      ingredient.id
    );
    return super.update(ingredient);
  }
}
