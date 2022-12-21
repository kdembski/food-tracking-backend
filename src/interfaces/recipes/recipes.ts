import { IListController } from "./../base/controllers/list";
import { IController } from "./../base/controllers/controller";
import { IListRepository } from "./../base/repositories/list";
import { IRepository } from "./../base/repositories/repository";
import { RecipesList } from "@/models/recipes/recipesList";
import { Recipe } from "@/models/recipes/recipe";
import { RequestQueryData } from "@/interfaces/helpers/requestQuery";
import { Tag } from "@/interfaces/base/models/tags";
import { IModel } from "../base/models/model";

export type RecipeDTO = {
  id?: number;
  recipeName?: string;
  preparationTime?: number;
  tags?: string;
  kcal?: number;
  cookedDate?: Date;
  cookidooLink?: string;
  cookedDatesInCurrentMonth?: Date[];
};

export interface IRecipe extends IModel<RecipeDTO> {}

export interface IRecipesRepository
  extends IRepository<Recipe, RecipeDTO>,
    IListRepository<RecipeDTO> {
  selectTags: (searchPhrase: string, tags?: string) => Promise<string[]>;
}

export interface IRecipesController
  extends IController<Recipe, RecipeDTO>,
    IListController<RecipesList> {
  getTags: (query: RequestQueryData) => Promise<Tag[]>;
  getNames: (searchPhrase: string, tags: string) => Promise<string[]>;
}
