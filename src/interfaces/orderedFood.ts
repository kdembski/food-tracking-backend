import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { IListController, IListRepository } from "./base/list";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "./base/dbEntity";
import { OrderedFoodList } from "@/main/ordered-food/models/orderedFoodList";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { TagDTO } from "@/dtos/base/tag";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { TagsConfig } from "@/types/base/tags";

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
