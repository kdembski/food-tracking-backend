import { Tags } from "@/base/tags/models/tags";

export class TagsMapper {
  toDTO(tags: Tags) {
    return tags.items.map((item) => ({ name: item.name, count: item.count }));
  }
}
