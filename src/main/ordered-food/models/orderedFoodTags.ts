import { Tags } from "@/base/tags/models/tags";
import { TagsConfig } from "@/interfaces/base/tags";
import { OrderedFoodRepository } from "@/repositories/orderedFood";

export class OrderedFoodTags extends Tags {
  getTags(config: TagsConfig): Promise<string[]> {
    return new OrderedFoodRepository().selectTags(config);
  }
}
