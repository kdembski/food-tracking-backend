import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { RequestQueryData } from "./helpers/requestQuery";
import { IListController, IListRepository } from "./base/list";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "./base/dbEntity";
import { OrderedFoodList } from "@/main/ordered-food/models/orderedFoodList";
import { TagDTO, TagsConfig } from "./base/tags";

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
  selectTags: (config: TagsConfig) => Promise<string[]>;
}

export interface IOrderedFoodController
  extends IDbEntityController<OrderedFood, OrderedFoodDTO>,
    IListController<OrderedFoodList> {
  getTags: (query: RequestQueryData) => Promise<TagDTO[]>;
}
