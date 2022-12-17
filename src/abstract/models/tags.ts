import { RequestQueryData } from "@/interfaces/helpers/requestQuery";
import { ITags, Tag } from "@/interfaces/tags";
import lodash from "lodash";
import { RequestQueryHelper } from "@/helpers/requestQuery";

export abstract class Tags implements ITags {
  private _tags?: Tag[];

  get tags() {
    return this._tags || [];
  }

  protected abstract getTags(
    searchPhrase: string,
    tags?: string
  ): Promise<string[]>;

  async loadTags(query: RequestQueryData) {
    const { searchPhrase, tags: queryTags } = new RequestQueryHelper(
      query
    ).getQueryValues();

    const tags = await this.getTags(searchPhrase, queryTags);
    const splittedTags = this.splitTags(tags);
    const countedTags = this.countTags(splittedTags);
    this._tags = countedTags.sort((a, b) => b.count - a.count);
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

      accum.push({
        name: tagName,
        count: 1,
      });
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
