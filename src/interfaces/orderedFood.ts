import { ITagsRepository } from "./base/tags";
import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { IListRepository } from "./base/list";
import { IDbEntityController, IRepository } from "./base/dbEntity";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { OrderedFoodListFilters } from "@/types/ordered-food/orderedFood";
import { Tag } from "@/base/tags/models/tag";

export interface IOrderedFood {}

export interface IOrderedFoodRepository
  extends IRepository<OrderedFood, OrderedFoodDTO>,
    IListRepository<OrderedFoodDTO, OrderedFoodListFilters>,
    ITagsRepository<OrderedFoodListFilters> {}

export interface IOrderedFoodController
  extends IDbEntityController<OrderedFood> {
  getTags: (filters: OrderedFoodListFilters) => Promise<Tag[]>;
}
