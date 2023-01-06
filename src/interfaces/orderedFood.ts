import { ITagsRepository } from "./base/tags";
import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { IListRepository } from "./base/list";
import {
  IDbEntityController,
  IDbEntityModel,
  IRepository,
} from "./base/dbEntity";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { Tags } from "@/base/tags/models/tags";

export interface IOrderedFood extends IDbEntityModel<OrderedFoodDTO> {}

export interface IOrderedFoodRepository
  extends IRepository<OrderedFood, OrderedFoodDTO>,
    IListRepository<OrderedFoodDTO>,
    ITagsRepository {}

export interface IOrderedFoodController
  extends IDbEntityController<OrderedFood, OrderedFoodDTO> {
  getTags: (query: RequestQueryData) => Promise<Tags>;
}
