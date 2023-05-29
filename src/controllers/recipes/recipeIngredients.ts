import { Request, Response } from "express";
import { RecipeIngredientsService } from "@/main/recipes/services/recipeIngredients";
import {
  RecipeIngredientDTO,
  RecipeIngredientQueryResult,
} from "@/dtos/recipes/recipeIngredient";
import { RecipeIngredient } from "@/main/recipes/models/recipeIngredient";
import { RecipeIngredientMapper } from "@/mappers/recipes/recipeIngredient";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { ApiError } from "@/_shared/errors/models/apiError";
import { RecipeIngredientValidator } from "@/main/recipes/validators/recipeIngredient";
import { CRUDController } from "../_shared/crud";

export class RecipeIngredientsController extends CRUDController<
  RecipeIngredient,
  RecipeIngredientDTO,
  RecipeIngredientQueryResult
> {
  protected service: RecipeIngredientsService;
  protected mapper: RecipeIngredientMapper;
  protected validator: RecipeIngredientValidator;

  constructor(
    service = new RecipeIngredientsService(),
    mapper = new RecipeIngredientMapper(),
    validator = new RecipeIngredientValidator()
  ) {
    super(service, mapper, validator);
    this.service = service;
    this.mapper = mapper;
    this.validator = validator;
  }

  async getOptions(request: Request, response: Response) {
    try {
      const { searchPhrase, tags, ingredientIds } = new RequestQueryHelper(
        request.query
      );

      const options = await this.service.getFilterOptions({
        searchPhrase,
        tags,
        ingredientIds,
      });
      response.json(options);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }
}
