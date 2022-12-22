import { OrderedFoodList } from "@/models/ordered-food/orderedFoodList";
import { OrderedFood } from "@/models/ordered-food/orderedFood";
import { Tag } from "./base/tags";
import { RequestQueryData } from "./helpers/requestQuery";
import { IListController, IListRepository } from "./base/list";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "./base/dbEntity";

export type OrderedFoodDTO = {
  id?: number;
  foodName?: string;
  placeName?: string;
  tags?: string;
  placeLink?: string;
  orderedDate?: Date;
};

export interface IOrderedFood extends IDbEntityModel<OrderedFoodDTO> {}

export interface IOrderedFoodRepository
  extends IRepository<OrderedFood, OrderedFoodDTO>,
    IListRepository<OrderedFoodDTO> {
  selectTags: (searchPhrase: string, tags?: string) => Promise<string[]>;
}

export interface IOrderedFoodController
  extends IDbEntityController<OrderedFood, OrderedFoodDTO>,
    IListController<OrderedFoodList> {
  getTags: (query: RequestQueryData) => Promise<Tag[]>;
}
