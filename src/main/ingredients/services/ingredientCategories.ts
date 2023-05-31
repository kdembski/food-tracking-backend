import { IngredientCategoriesRepository } from "@/repositories/ingredients/ingredientCategories";
import { IngredientCategory } from "../models/ingredientCategory";
import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { IngredientCategoriesListFilters } from "@/types/ingredients/ingredientCategories";
import { IngredientCategoryMapper } from "@/mappers/ingredients/ingredientCategory";
import { IngredientCategoriesList } from "../models/ingredientCategoriesList";
import { CRUDService } from "@/main/_shared/crud/services/crud";
import { ListService } from "@/main/_shared/list/listService";

export class IngredientCategoriesService extends CRUDService<
  IngredientCategory,
  IngredientCategoryDTO
> {
  protected repository: IngredientCategoriesRepository;
  protected mapper: IngredientCategoryMapper;
  list: ListService<
    IngredientCategory,
    IngredientCategoryDTO,
    IngredientCategoriesListFilters
  >;

  constructor(
    repository = new IngredientCategoriesRepository(),
    mapper = new IngredientCategoryMapper(),
    list = new ListService(new IngredientCategoriesList(), repository.list)
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
