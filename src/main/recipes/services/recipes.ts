import { RecipeBuilder } from "./../builders/recipe";
import { RecipesRepository } from "@/repositories/recipes/recipes";
import { Recipe } from "@/main/recipes/models/recipe";
import { RecipesList } from "../models/recipesList";
import { RecipesListFilters } from "@/types/recipes/recipes";
import { ListService } from "@/main/_shared/list/listService";
import { RecipeQueryResult } from "@/dtos/recipes/recipe";
import { CRUDService } from "@/main/_shared/crud/services/crud";
import { TagsBuilder } from "@/main/_shared/tags/tagsBuilder";
import { RecipeQueryResultMapper } from "@/mappers/recipes/recipeQueryResult";

export class RecipesService extends CRUDService<Recipe, RecipeQueryResult> {
  private tagsBuilder: TagsBuilder<RecipesListFilters>;
  private builder: RecipeBuilder;
  protected repository: RecipesRepository;
  protected mapper: RecipeQueryResultMapper;

  list: ListService<Recipe, RecipeQueryResult, RecipesListFilters>;

  constructor(
    repository = new RecipesRepository(),
    mapper = new RecipeQueryResultMapper(),
    list = new ListService(new RecipesList(), repository.list),
    tagsBuilder = new TagsBuilder(repository),
    builder = new RecipeBuilder()
  ) {
    super(repository, mapper);
    this.repository = repository;
    this.mapper = mapper;
    this.list = list;
    this.tagsBuilder = tagsBuilder;
    this.builder = builder;
  }

  async getTags(filters: RecipesListFilters) {
    await this.tagsBuilder.build(filters);
    return this.tagsBuilder.tags;
  }

  getNames(filters: RecipesListFilters) {
    return this.repository.selectNames(filters);
  }

  getOptions() {
    return this.repository.selectOptions();
  }

  async getById(id: number) {
    const recipe = await super.getById(id);
    this.builder.recipe = recipe;
    await this.builder.produceDatesFromLastYear();

    return recipe;
  }

  updateKcal(kcal: number, id: number) {
    return this.repository.updateKcal(kcal, id);
  }
}
