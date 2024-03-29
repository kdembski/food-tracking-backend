import { Request, Response } from "express";
import { IngredientCategory } from "@/main/ingredients/models/ingredientCategory";
import { IngredientCategoriesService } from "@/main/ingredients/services/ingredientCategories";
import { IngredientCategoryValidator } from "@/main/ingredients/validators/ingredientCategory";
import { IngredientCategoryMapper } from "@/mappers/ingredients/ingredientCategory";
import { CRUDController } from "../_shared/crud";
import { IngredientCategoryDTO } from "@/dtos/ingredients/ingredientCategory";
import { ApiError } from "@/_shared/errors/models/apiError";
import { ListController } from "../_shared/list";
import { IngredientCategoriesListFilters } from "@/types/ingredients/ingredientCategories";
import { ListMapper } from "@/main/_shared/list/listMapper";

export class IngredientCategoriesController extends CRUDController<
  IngredientCategory,
  IngredientCategoryDTO,
  IngredientCategoryDTO
> {
  protected service: IngredientCategoriesService;
  protected mapper: IngredientCategoryMapper;
  protected validator: IngredientCategoryValidator;
  list: ListController<
    IngredientCategory,
    IngredientCategoryDTO,
    IngredientCategoryDTO,
    IngredientCategoriesListFilters
  >;

  constructor(
    service = new IngredientCategoriesService(),
    mapper = new IngredientCategoryMapper(),
    validator = new IngredientCategoryValidator(),
    list = new ListController(service.list, new ListMapper(mapper))
  ) {
    super(service, mapper, validator);
    this.service = service;
    this.mapper = mapper;
    this.validator = validator;
    this.list = list;
  }

  async getOptions(request: Request, response: Response) {
    try {
      const ingredientOptions = await this.service.getOptions();
      response.json(ingredientOptions);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }
}
