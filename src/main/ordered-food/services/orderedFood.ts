import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { RequestQueryData } from "@/types/helpers/requestQuery";
import { OrderedFoodRepository } from "@/repositories/orderedFood";
import { OrderedFoodList } from "../models/orderedFoodList";
import { ListBuilder } from "@/base/list/builders/list";
import { TagsBuilder } from "@/base/tags/builders/tags";
import { RequestQueryHelper } from "@/helpers/requestQuery";
import { OrderedFoodListFilters } from "@/types/ordered-food/orderedFood";
import { IDbEntityService } from "@/interfaces/base/db-entity/dbEntityService";

export class OrderedFoodService implements IDbEntityService<OrderedFood> {
  async getList(query: RequestQueryData) {
    const { searchPhrase, tags } = new RequestQueryHelper(query);
    const orderedFoodList = new OrderedFoodList();
    const listBuilder = new ListBuilder(orderedFoodList);
    await listBuilder.build(query, { searchPhrase, tags });

    return orderedFoodList;
  }

  async getTags(filters: OrderedFoodListFilters) {
    const tagsBuilder = new TagsBuilder(new OrderedFoodRepository());
    await tagsBuilder.build(filters);

    return tagsBuilder.tags;
  }

  getCount(filters: OrderedFoodListFilters) {
    return new OrderedFoodRepository().selectCount(filters);
  }

  async getById(id: number) {
    const dto = await new OrderedFoodRepository().selectById(id);
    return new OrderedFood(dto);
  }

  create(orderedFood: OrderedFood) {
    return new OrderedFoodRepository().insert(orderedFood);
  }

  update(orderedFood: OrderedFood) {
    return new OrderedFoodRepository().update(orderedFood);
  }

  delete(id: number) {
    return new OrderedFoodRepository().delete(id);
  }
}
