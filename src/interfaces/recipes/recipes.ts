import { ITagsRepository } from "./../base/tags";
import { IListRepository } from "../base/list";
import { Recipe } from "@/main/recipes/models/recipe";
import { IDbEntityController, IRepository } from "../base/dbEntity";
import { ExtendedRecipeDTO } from "@/dtos/recipes/recipe";
import { RecipesListFilters } from "@/types/recipes/recipes";
import { Tag } from "@/base/tags/models/tag";

export interface IRecipe {}

export interface IRecipesRepository
  extends IRepository<Recipe, ExtendedRecipeDTO>,
    IListRepository<ExtendedRecipeDTO, RecipesListFilters>,
    ITagsRepository<RecipesListFilters> {}

export interface IRecipesController extends IDbEntityController<Recipe> {
  getTags: (filters: RecipesListFilters) => Promise<Tag[]>;
  getNames: (filters: RecipesListFilters) => Promise<string[]>;
}
