import { Tags } from "@/base/tags/models/tags";
import { OrderedFoodRepository } from "@/repositories/orderedFood";

export class OrderedFoodTags extends Tags {
  protected getTags(searchPhrase: string, tags?: string): Promise<string[]> {
    return new OrderedFoodRepository().selectTags(searchPhrase, tags);
  }
}
