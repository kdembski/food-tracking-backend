import { IngredientCategoriesRepository } from "@/repositories/ingredients/ingredientCategories";
import { IngredientCategory } from "../models/ingredientCategory";
import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { IngredientCategoriesListFilters } from "@/types/ingredients/ingredientCategories";
import { IngredientCategoryMapper } from "@/mappers/ingredients/ingredientCategory";
import { IngredientCategoriesList } from "../models/ingredientCategoriesList";
import { DbEntityService } from "@/main/_shared/db-entity/services/dbEntity";
import { ListService } from "@/main/_shared/list/listService";

export class IngredientCategoriesService extends DbEntityService<
  IngredientCategory,
  IngredientCategoryDTO
> {
  protected repository: IngredientCategoriesRepository;
  protected mapper: IngredientCategoryMapper;
  list: ListService<
    IngredientCategory,
    IngredientCategoryDTO,
    IngredientCategoryDTO,
    IngredientCategoriesListFilters
  >;

  constructor(
    repository = new IngredientCategoriesRepository(),
    mapper = new IngredientCategoryMapper(),
    list = new ListService(new IngredientCategoriesList())
  ) {
    super(repository, mapper);
    this.repository = repository;
    this.mapper = mapper;
    this.list = list;
  }

  getOptions() {
    return this.repository.selectOptions();
  }
}
