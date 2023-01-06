import { ITagsRepository } from "./../base/tags";
import { IListRepository } from "../base/list";
import { Recipe } from "@/main/recipes/models/recipe";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "../base/dbEntity";
import { RecipeDTO } from "@/dtos/recipes/recipe";
import { TagDTO } from "@/dtos/base/tag";
import { TagsConfig } from "@/types/base/tags";

export interface IRecipe extends IDbEntityModel<RecipeDTO> {
  setDatesFromLastYear: () => Promise<void>;
}

export interface IRecipesRepository
  extends IRepository<Recipe, RecipeDTO>,
    IListRepository<RecipeDTO>,
    ITagsRepository {}

export interface IRecipesController
  extends IDbEntityController<Recipe, RecipeDTO> {
  getTags: (query: RequestQueryData) => Promise<TagDTO[]>;
  getNames: (searchPhrase: string, tags: string) => Promise<string[]>;
}
