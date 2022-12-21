import { IListRepository } from "./../base/repositories/list";
import { IRepository } from "./../base/repositories/repository";
import { RecipesList } from "@/models/recipes/recipesList";
import { Recipe } from "@/models/recipes/recipe";
import { OkPacket } from "mysql2";
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

export interface IRecipe extends IModel<RecipeDTO> {
  updateCookedDate: () => Promise<void>;
}

export interface IRecipesRepository
  extends IRepository<Recipe>,
    IListRepository<RecipeDTO> {
  selectById: (id: number) => Promise<RecipeDTO>;
  selectTags: (searchPhrase: string, tags?: string) => Promise<string[]>;
}

export interface IRecipesController {
  getRecipesList: (query: RequestQueryData) => Promise<RecipesList>;
  getRecipesTags: (query: RequestQueryData) => Promise<Tag[]>;
  getRecipesNames: (searchPhrase: string, tags: string) => Promise<string[]>;
  getRecipesCount: (searchPhrase: string, tags?: string) => Promise<number>;
  getRecipeById: (id: number) => Promise<Recipe>;
  createRecipe: (data: RecipeDTO) => Promise<OkPacket>;
  updateRecipe: (data: RecipeDTO) => Promise<OkPacket>;
  deleteRecipe: (id: number) => Promise<OkPacket>;
}
