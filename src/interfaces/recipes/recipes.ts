import { ITagsRepository } from "./../base/tags";
import { IListRepository } from "../base/list";
import { Recipe } from "@/main/recipes/models/recipe";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { IDbEntityController, IRepository } from "../base/dbEntity";
import { RecipeDTO } from "@/dtos/recipes/recipe";
import { Tags } from "@/base/tags/models/tags";

export interface IRecipe {
  setDatesFromLastYear: () => Promise<void>;
}

export interface IRecipesRepository
  extends IRepository<Recipe, RecipeDTO>,
    IListRepository<RecipeDTO>,
    ITagsRepository {}

export interface IRecipesController
  extends IDbEntityController<Recipe, RecipeDTO> {
  getTags: (query: RequestQueryData) => Promise<Tags>;
  getNames: (searchPhrase: string, tags: string) => Promise<string[]>;
}
