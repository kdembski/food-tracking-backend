import { Request, Response } from "express";
import { RecipeIngredientDTO } from "@/dtos/recipes/recipeIngredient";
import { RecipeIngredientCollectionMapper } from "@/mappers/recipes/recipeIngredientsCollection";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { RecipesService } from "@/main/recipes/services/recipes";
import { ExtendedRecipeDTO, RecipeQueryResult } from "@/dtos/recipes/recipe";
import { ExtendedRecipeMapper } from "@/mappers/recipes/extendedRecipe";
import { Recipe } from "@/main/recipes/models/recipe";
import { RecipeIngredientsCollectionService } from "@/main/recipes/services/recipe-ingredients-collection/recipeIngredientsCollection";
import { RecipeValidator } from "@/main/recipes/validators/recipe";
import { RecipeIngredientsCollectionValidator } from "@/main/recipes/validators/recipeIngredientsCollection";
import { ListController } from "../_shared/list";
import { RecipesListFilters } from "@/types/recipes/recipes";
import { CRUDController } from "../_shared/crud";
import { ApiError } from "@/_shared/errors/models/apiError";
import { TagsMapper } from "@/mappers/_shared/tags";
import { ListMapper } from "@/main/_shared/list/listMapper";

export class RecipesController extends CRUDController<
  Recipe,
  ExtendedRecipeDTO,
  RecipeQueryResult
> {
  private ingredientsCollectionService: RecipeIngredientsCollectionService;
  private ingredientsCollectionMapper: RecipeIngredientCollectionMapper;
  private ingredientsCollectionValidator: RecipeIngredientsCollectionValidator;
  protected service: RecipesService;
  protected mapper: ExtendedRecipeMapper;
  protected validator: RecipeValidator;
  list: ListController<
    Recipe,
    ExtendedRecipeDTO,
    RecipeQueryResult,
    RecipesListFilters
  >;

  constructor(
    service = new RecipesService(),
    mapper = new ExtendedRecipeMapper(),
    validator = new RecipeValidator(),
    list = new ListController(service.list, new ListMapper(mapper)),
    ingredientsCollectionService = new RecipeIngredientsCollectionService(),
    ingredientsCollectionMapper = new RecipeIngredientCollectionMapper(),
    ingredientsCollectionValidator = new RecipeIngredientsCollectionValidator()
  ) {
    super(service, mapper, validator);
    this.service = service;
    this.mapper = mapper;
    this.validator = validator;
    this.list = list;
    this.ingredientsCollectionService = ingredientsCollectionService;
    this.ingredientsCollectionMapper = ingredientsCollectionMapper;
    this.ingredientsCollectionValidator = ingredientsCollectionValidator;
  }

  async getOptions(request: Request, response: Response) {
    try {
      const options = await this.service.getOptions();
      response.json(options);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async getTags(request: Request, response: Response) {
    try {
      const { searchPhrase, tags, ingredientIds } = new RequestQueryHelper(
        request.query
      );

      const results = await this.service.getTags({
        searchPhrase,
        tags,
        ingredientIds,
      });
      response.json(new TagsMapper().toDTO(results));
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async getSuggestions(request: Request, response: Response) {
    try {
      const { searchPhrase, tags, ingredientIds } = new RequestQueryHelper(
        request.query
      );

      const results = await this.service.getNames({
        searchPhrase,
        tags,
        ingredientIds,
      });
      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async getIngredients(request: Request<{ id: string }>, response: Response) {
    try {
      const id = new RequestParamsHelper(request.params).id;

      const collection = await this.ingredientsCollectionService.getByRecipeId(
        id
      );
      response.json(this.ingredientsCollectionMapper.toDTO(collection));
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async createIngredients(
    request: Request<{ id: string }>,
    response: Response
  ) {
    try {
      const recipeId = new RequestParamsHelper(request.params).id;
      const data: RecipeIngredientDTO[] = request.body;
      const collection = this.ingredientsCollectionMapper.toDomain(data);
      this.ingredientsCollectionValidator.validate(collection).throwErrors();

      const results = await this.ingredientsCollectionService.create(
        collection,
        recipeId
      );
      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async updateIngredients(
    request: Request<{ id: string }>,
    response: Response
  ) {
    try {
      const recipeId = new RequestParamsHelper(request.params).id;
      const data: RecipeIngredientDTO[] = request.body;
      const collection = this.ingredientsCollectionMapper.toDomain(data);
      this.ingredientsCollectionValidator.validate(collection).throwErrors();

      const results = await this.ingredientsCollectionService.update(
        collection,
        recipeId
      );
      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }
}
