import { IOrderedFoodController } from "@/interfaces/orderedFood";
import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { OrderedFoodRepository } from "@/repositories/orderedFood";
import { OrderedFoodList } from "../models/orderedFoodList";
import { OrderedFoodTags } from "../models/orderedFoodTags";
import { ListBuilder } from "@/base/list/builders/list";
import { TagsBuilder } from "@/base/tags/builders/tags";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";

export class OrderedFoodController implements IOrderedFoodController {
  async getList(query: RequestQueryData) {
    const orderedFoodList = new OrderedFoodList();
    const listBuilder = new ListBuilder(orderedFoodList);
    await listBuilder.build(query);
    return orderedFoodList;
  }

  async getTags(query: RequestQueryData) {
    const orderedFoodTags = new OrderedFoodTags();
    const tagsBuilder = new TagsBuilder(orderedFoodTags);
    await tagsBuilder.build(query);
    return orderedFoodTags;
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
