import { TagDTO } from "@/dtos/base/tag";
import { TagsConfig } from "@/types/base/tags";
import { RequestQueryData } from "@/types/helpers/requestQuery";

export interface ITags {
  getItemsDTO: () => TagDTO[];
}

export interface ITagsBuilder {
  buildConfig(query: RequestQueryData): void;
  build(query: RequestQueryData): void;
}

export interface ITagsRepository {
  selectTags: (config: TagsConfig) => Promise<string[]>;
}
