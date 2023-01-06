import { IListController, IListRepository } from "../base/list";
import { Recipe } from "@/main/recipes/models/recipe";
import { RequestQueryData } from "@/interfaces/helpers/requestQuery";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "../base/dbEntity";
import { RecipesList } from "@/main/recipes/models/recipesList";
import { TagsConfig } from "../base/tags";
import { RecipeDTO } from "@/dtos/recipes/recipe";
import { TagDTO } from "@/dtos/base/tag";

export interface IRecipe extends IDbEntityModel<RecipeDTO> {
  setDatesFromLastYear: () => Promise<void>;
}

export interface IRecipesRepository
  extends IRepository<Recipe, RecipeDTO>,
    IListRepository<RecipeDTO> {
  selectTags: (config: TagsConfig) => Promise<string[]>;
}

export interface IRecipesController
  extends IDbEntityController<Recipe, RecipeDTO>,
    IListController<RecipesList> {
  getTags: (query: RequestQueryData) => Promise<TagDTO[]>;
  getNames: (searchPhrase: string, tags: string) => Promise<string[]>;
}
