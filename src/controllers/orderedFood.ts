import { IOrderedFoodController } from "@/interfaces/orderedFood";
import { OrderedFoodList } from "@/models/ordered-food/orderedFoodList";
import { OrderedFood } from "@/models/ordered-food/orderedFood";
import { OrderedFoodTags } from "@/models/ordered-food/orderedFoodTags";
import { OrderedFoodDTO } from "@/interfaces/orderedFood";
import { RequestQueryData } from "@/interfaces/helpers/requestQuery";
import { OrderedFoodRepository } from "@/repositories/orderedFood";

export class OrderedFoodController implements IOrderedFoodController {
  async getOrderedFoodList(query: RequestQueryData) {
    const orderedFoodList = new OrderedFoodList();
    await orderedFoodList.loadList(query);
    return orderedFoodList;
  }

  async getOrderedFoodTags(query: RequestQueryData) {
    const orderedFoodTags = new OrderedFoodTags();
    await orderedFoodTags.loadTags(query);
    return orderedFoodTags.tags;
  }

  getOrderedFoodCount(searchPhrase: string, tags?: string) {
    return new OrderedFoodRepository().selectCount(searchPhrase, tags);
  }

  async getOrderedFoodById(id: number) {
    const dto = await new OrderedFoodRepository().selectById(id);
    const orderedFood = new OrderedFood(dto);
    return orderedFood;
  }

  async createOrderedFood(data: OrderedFoodDTO) {
    const orderedFood = new OrderedFood(data);
    const results = await new OrderedFoodRepository().insert(orderedFood);
    return results;
  }

  async updateOrderedFood(data: OrderedFoodDTO) {
    const orderedFood = new OrderedFood(data);
    const results = await new OrderedFoodRepository().update(orderedFood);
    return results;
  }

  async deleteOrderedFood(id: number) {
    const results = await new OrderedFoodRepository().delete(id);
    return results;
  }
}
