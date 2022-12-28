import { IOrderedFoodController } from "@/interfaces/orderedFood";
import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { OrderedFoodDTO } from "@/interfaces/orderedFood";
import { RequestQueryData } from "@/interfaces/helpers/requestQuery";
import { OrderedFoodRepository } from "@/repositories/orderedFood";
import { OrderedFoodList } from "../models/orderedFoodList";
import { OrderedFoodTags } from "../models/orderedFoodTags";

export class OrderedFoodController implements IOrderedFoodController {
  async getList(query: RequestQueryData) {
    const orderedFoodList = new OrderedFoodList();
    await orderedFoodList.loadList(query);
    return orderedFoodList;
  }

  async getTags(query: RequestQueryData) {
    const orderedFoodTags = new OrderedFoodTags();
    await orderedFoodTags.loadTags(query);
    return orderedFoodTags.tags;
  }

  getCount(searchPhrase: string, tags?: string) {
    return new OrderedFoodRepository().selectCount(searchPhrase, tags);
  }

  async getById(id: number) {
    const dto = await new OrderedFoodRepository().selectById(id);
    return new OrderedFood(dto);
  }

  create(data: OrderedFoodDTO) {
    const orderedFood = new OrderedFood(data);
    return new OrderedFoodRepository().insert(orderedFood);
  }

  update(data: OrderedFoodDTO) {
    const orderedFood = new OrderedFood(data);
    return new OrderedFoodRepository().update(orderedFood);
  }

  delete(id: number) {
    return new OrderedFoodRepository().delete(id);
  }
}
