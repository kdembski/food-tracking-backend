import { OrderedFoodList } from "@/models/ordered-food/orderedFoodList";
import { OrderedFood } from "@/models/ordered-food/orderedFood";
import { Tag } from "./tags";
import { OkPacket } from "mysql2";
import { RequestQueryData } from "./helpers/requestQuery";

export type OrderedFoodDTO = {
  id?: number;
  foodName?: string;
  placeName?: string;
  tags?: string;
  placeLink?: string;
  orderedDate?: Date;
};

export interface IOrderedFood {
  setFromDTO: (data: OrderedFoodDTO) => void;
  getDTO: () => OrderedFoodDTO;
  updateOrderedDate: () => Promise<void>;
}

export interface IOrderedFoodRepository {
  selectById: (id: number) => Promise<OrderedFoodDTO>;
  selectList: (
    searchPhrase: string,
    sortAttribute: string,
    sortDirection: string,
    tags: string,
    size: number,
    offset: number
  ) => Promise<OrderedFoodDTO[]>;
  selectTags: (searchPhrase: string, tags?: string) => Promise<string[]>;
  selectCount: (searchPhrase: string, tags?: string) => Promise<number>;
  insert: (data: OrderedFood) => Promise<OkPacket>;
  update: (data: OrderedFood) => Promise<OkPacket>;
  delete: (id: number) => Promise<OkPacket>;
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
