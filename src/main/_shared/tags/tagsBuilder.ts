import { ITagsBuilder } from "@/interfaces/_shared/tags/tagsBuilder";
import lodash from "lodash";
import { Tag } from "./tag";
import { ITagsRepository } from "@/interfaces/_shared/tags/tagsRepository";

export class TagsBuilder<Filters> implements ITagsBuilder<Filters> {
  private _tags?: Tag[];
  private repository: ITagsRepository<Filters>;

  constructor(repository: ITagsRepository<Filters>) {
    this.repository = repository;
  }

  get tags() {
    return this._tags || [];
  }

  async build(filters: Filters) {
    const tags = await this.repository.selectTags(filters);
    const splittedTags = this.splitTags(tags);
    this._tags = this.countTags(splittedTags).sort((a, b) => b.count - a.count);
  }

  private countTags(tagNames: string[]) {
    return tagNames.reduce((accum: Tag[], tagName) => {
      const duplicateIndex = accum.findIndex(
        (tag: Tag) => tag.name === tagName
      );
      const isDuplicate = duplicateIndex !== -1;

      if (isDuplicate) {
        accum[duplicateIndex].count++;
        return accum;
      }

      accum.push(new Tag(tagName));
      return accum;
    }, []);
  }

  private splitTags(itemsTags: string[]) {
    let splittedTags: string[] = [];

    itemsTags.forEach((itemTags) => {
      const splittedItemTags = itemTags.split(",");
      splittedTags = lodash.concat(splittedTags, splittedItemTags);
    });

    return splittedTags;
  }
}
