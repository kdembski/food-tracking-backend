import { IListController } from "./base/controllers/list";
import { IController } from "@/interfaces/base/controllers/controller";
import { IRepository } from "./base/repositories/repository";
import { OrderedFoodList } from "@/models/ordered-food/orderedFoodList";
import { OrderedFood } from "@/models/ordered-food/orderedFood";
import { Tag } from "./base/models/tags";
import { OkPacket } from "mysql2";
import { RequestQueryData } from "./helpers/requestQuery";
import { IListRepository } from "./base/repositories/list";
import { IModel } from "./base/models/model";

export type OrderedFoodDTO = {
  id?: number;
  foodName?: string;
  placeName?: string;
  tags?: string;
  placeLink?: string;
  orderedDate?: Date;
};

export interface IOrderedFood extends IModel<OrderedFoodDTO> {}

export interface IOrderedFoodRepository
  extends IRepository<OrderedFood, OrderedFoodDTO>,
    IListRepository<OrderedFoodDTO> {
  selectTags: (searchPhrase: string, tags?: string) => Promise<string[]>;
}

export interface IOrderedFoodController
  extends IController<OrderedFood, OrderedFoodDTO>,
    IListController<OrderedFoodList> {
  getTags: (query: RequestQueryData) => Promise<Tag[]>;
}
