import { IListController, IListRepository } from "../base/list";
import { RecipesList } from "@/models/recipes/recipesList";
import { Recipe } from "@/models/recipes/recipe";
import { RequestQueryData } from "@/interfaces/helpers/requestQuery";
import { Tag } from "@/interfaces/base/tags";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "../base/dbEntity";

export type RecipeDTO = {
  id?: number;
  recipeName?: string;
  preparationTime?: number;
  tags?: string;
  kcal?: number;
  cookedDate?: Date;
  cookidooLink?: string;
  getFromLastYear?: Date[][];
};

export interface IRecipe extends IDbEntityModel<RecipeDTO> {
  setDatesFromLastYear: () => Promise<void>;
}

export interface IRecipesRepository
  extends IRepository<Recipe, RecipeDTO>,
    IListRepository<RecipeDTO> {
  selectTags: (searchPhrase: string, tags?: string) => Promise<string[]>;
}

export interface IRecipesController
  extends IDbEntityController<Recipe, RecipeDTO>,
    IListController<RecipesList> {
  getTags: (query: RequestQueryData) => Promise<Tag[]>;
  getNames: (searchPhrase: string, tags: string) => Promise<string[]>;
}
