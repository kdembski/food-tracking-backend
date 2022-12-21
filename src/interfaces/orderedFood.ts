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

export interface IOrderedFood extends IModel<OrderedFoodDTO> {
  updateOrderedDate: () => Promise<void>;
}

export interface IOrderedFoodRepository
  extends IRepository<OrderedFood>,
    IListRepository<OrderedFoodDTO> {
  selectById: (id: number) => Promise<OrderedFoodDTO>;
  selectTags: (searchPhrase: string, tags?: string) => Promise<string[]>;
}

export interface IOrderedFoodController {
  getOrderedFoodList: (query: RequestQueryData) => Promise<OrderedFoodList>;
  getOrderedFoodTags: (query: RequestQueryData) => Promise<Tag[]>;
  getOrderedFoodCount: (searchPhrase: string, tags?: string) => Promise<number>;
  getOrderedFoodById: (id: number) => Promise<OrderedFood>;
  createOrderedFood: (data: OrderedFoodDTO) => Promise<OkPacket>;
  updateOrderedFood: (data: OrderedFoodDTO) => Promise<OkPacket>;
  deleteOrderedFood: (id: number) => Promise<OkPacket>;
}
