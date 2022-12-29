import { RequestQueryHelper } from "@/helpers/requestQuery";
import { ITagsBuilder } from "@/interfaces/base/tags";
import { RequestQueryData } from "@/interfaces/helpers/requestQuery";
import lodash from "lodash";
import { Tag } from "../models/tag";
import { Tags } from "../models/tags";

export class TagsBuilder implements ITagsBuilder {
  private tags: Tags;

  constructor(tags: Tags) {
    this.tags = tags;
  }

  buildConfig(query: RequestQueryData) {
    const { searchPhrase, tags } = new RequestQueryHelper(
      query
    ).getQueryValues();

    this.tags.config = {
      searchPhrase,
      tags,
    };
  }

  async build(query: RequestQueryData) {
    this.buildConfig(query);

    let tags = await this.tags.getTags(this.tags.config);
    tags = this.splitTags(tags);
    this.tags.items = this.countTags(tags).sort((a, b) => b.count - a.count);
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
