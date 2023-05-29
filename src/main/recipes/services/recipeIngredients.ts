import { IngredientUnitsService } from "./../../ingredients/services/ingredientUnits";
import { RecipeIngredientsRepository } from "@/repositories/recipes/recipeIngredients";
import { RecipeIngredient } from "../models/recipeIngredient";
import { RecipeIngredientQueryResultMapper } from "@/mappers/recipes/recipeIngredientQueryResult";
import { RecipesListFilters } from "@/types/recipes/recipes";
import { RecipesRepository } from "@/repositories/recipes/recipes";
import { RecipeIngredientsFilterOptionBuilder } from "../builders/recipeIngredientsFilterOptions";
import { RecipeIngredientQueryResult } from "@/dtos/recipes/recipeIngredient";
import { DbEntityService } from "@/main/_shared/db-entity/services/dbEntity";

export class RecipeIngredientsService extends DbEntityService<
  RecipeIngredient,
  RecipeIngredientQueryResult
> {
  protected repository: RecipeIngredientsRepository;
  protected mapper: RecipeIngredientQueryResultMapper;
  private recipesRepository: RecipesRepository;
  private recipeIngredientsFilterOptionBuilder: RecipeIngredientsFilterOptionBuilder;
  private ingredientUnitsService: IngredientUnitsService;

  constructor(
    repository = new RecipeIngredientsRepository(),
    mapper = new RecipeIngredientQueryResultMapper(),
    recipesRepository = new RecipesRepository(),
    recipeIngredientsFilterOptionBuilder = new RecipeIngredientsFilterOptionBuilder(),
    ingredientUnitsService = new IngredientUnitsService()
  ) {
    super(repository, mapper);
    this.repository = repository;
    this.mapper = mapper;
    this.recipesRepository = recipesRepository;
    this.recipeIngredientsFilterOptionBuilder =
      recipeIngredientsFilterOptionBuilder;
    this.ingredientUnitsService = ingredientUnitsService;
  }

  async getFilterOptions(filters: RecipesListFilters) {
    const ids = await this.recipesRepository.selectIngredientIds(filters);
    return this.recipeIngredientsFilterOptionBuilder.build(ids).options;
  }

  async create(ingredient: RecipeIngredient) {
    await this.setIngredientUnitId(ingredient);
    return super.create(ingredient);
  }

  async update(ingredient: RecipeIngredient) {
    await this.setIngredientUnitId(ingredient);
    return super.update(ingredient);
  }

  private async setIngredientUnitId(ingredient: RecipeIngredient) {
    const ingredientUnit =
      await this.ingredientUnitsService.getByIngredientIdAndUnitId(
        ingredient.ingredientId as number,
        ingredient.unitId as number
      );
    ingredient.ingredientUnitId = ingredientUnit.id;
  }
}
