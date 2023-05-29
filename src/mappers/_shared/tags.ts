import { Tag } from "@/main/_shared/tags/tag";

export class TagsMapper {
  toDTO(tags: Tag[]) {
    return tags.map((item) => ({ name: item.name, count: item.count }));
  }
}
