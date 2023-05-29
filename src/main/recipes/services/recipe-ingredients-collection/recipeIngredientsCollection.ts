import { RecipesService } from "@/main/recipes/services/recipes";
import { RecipeIngredientsService } from "../recipeIngredients";
import { RecipeIngredientsRepository } from "@/repositories/recipes/recipeIngredients";
import { RecipeIngredientsCollection } from "../../collections/recipeIngredients";
import { RecipeIngredient } from "../../models/recipeIngredient";
import { RecipeIngredientsCollectionBuilder } from "../../builders/recipeIngredientsCollection";
import { DbEntityCollectionService } from "@/main/_shared/db-entity/services/dbEntityCollection";
import { RecipeIngredientQueryResultsCollectionMapper } from "@/mappers/recipes/recipeIngredientQueryResultsCollection";

export class RecipeIngredientsCollectionService extends DbEntityCollectionService<
  RecipeIngredient,
  RecipeIngredientsCollection
> {
  protected service: RecipeIngredientsService;
  private repository: RecipeIngredientsRepository;
  private mapper: RecipeIngredientQueryResultsCollectionMapper;
  private builder: RecipeIngredientsCollectionBuilder;
  private recipesService: RecipesService;

  constructor(
    service = new RecipeIngredientsService(),
    repository = new RecipeIngredientsRepository(),
    mapper = new RecipeIngredientQueryResultsCollectionMapper(),
    builder = new RecipeIngredientsCollectionBuilder(),
    recipesService = new RecipesService()
  ) {
    super(service);
    this.service = service;
    this.repository = repository;
    this.mapper = mapper;
    this.builder = builder;
    this.recipesService = recipesService;
  }

  getCollection(selectorId: number) {
    return this.getByRecipeId(selectorId);
  }

  setSelectorId(item: RecipeIngredient, selectorId: number) {
    item.recipeId = selectorId;
  }

  async getByRecipeId(recipeId: number) {
    const dtos = await this.repository.selectByRecipeId(recipeId);
    return this.mapper.toDomain(dtos);
  }

  async getByIngredientUnitId(recipeId: number) {
    const dtos = await this.repository.selectByIngredientUnitId(recipeId);
    return this.mapper.toDomain(dtos);
  }

  override async update(
    newCollection: RecipeIngredientsCollection | undefined,
    recipeId: number | undefined
  ) {
    if (!newCollection || !recipeId) {
      return;
    }

    const results = await super.update(newCollection, recipeId);
    this.updateRecipeKcal(recipeId);
    return results;
  }

  override async create(
    collection: RecipeIngredientsCollection | undefined,
    recipeId: number | undefined
  ) {
    if (!collection || !recipeId) {
      return;
    }

    const results = await super.create(collection, recipeId);
    this.updateRecipeKcal(recipeId);
    return results;
  }

  async updateRecipeKcal(recipeId: number) {
    const collection = await this.getByRecipeId(recipeId);
    this.builder.collection = collection;
    this.builder.calculateKcal();

    this.recipesService.updateKcal(this.builder.collection.kcal, recipeId);
  }
}
