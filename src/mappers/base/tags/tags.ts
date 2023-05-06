import { Tag } from "@/base/tags/models/tag";

export class TagsMapper {
  toDTO(tags: Tag[]) {
    return tags.map((item) => ({ name: item.name, count: item.count }));
  }
}
