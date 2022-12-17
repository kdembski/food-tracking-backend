import { RecipesList } from "@/models/recipes/recipesList";
import { Recipe } from "@/models/recipes/recipe";
import { OkPacket } from "mysql2";
import { RequestQueryData } from "@/interfaces/helpers/requestQuery";
import { Tag } from "../tags";

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

export interface IRecipe {
  setFromDTO: (data: RecipeDTO) => void;
  getDTO: () => RecipeDTO;
  updateCookedDate: () => Promise<void>;
}

export interface IRecipesRepository {
  selectById: (id: number) => Promise<RecipeDTO>;
  selectList: (
    searchPhrase: string,
    sortAttribute: string,
    sortDirection: string,
    tags: string,
    size: number,
    offset: number
  ) => Promise<RecipeDTO[]>;
  selectTags: (searchPhrase: string, tags?: string) => Promise<string[]>;
  selectCount: (searchPhrase: string, tags?: string) => Promise<number>;
  insert: (data: Recipe) => Promise<OkPacket>;
  update: (data: Recipe) => Promise<OkPacket>;
  delete: (id: number) => Promise<OkPacket>;
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
