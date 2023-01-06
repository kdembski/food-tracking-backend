import { Tags } from "@/base/tags/models/tags";
import { OrderedFoodRepository } from "@/repositories/orderedFood";

export class OrderedFoodTags extends Tags {
  constructor() {
    super(new OrderedFoodRepository());
  }
}
