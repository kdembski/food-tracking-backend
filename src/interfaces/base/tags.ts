import { RequestQueryData } from "../helpers/requestQuery";

export type TagsConfig = {
  searchPhrase: string;
  tags?: string;
};

export interface ITags {
  getItemsDTO: () => void;
}

export interface ITagsBuilder {
  buildConfig(query: RequestQueryData): void;
  build(query: RequestQueryData): void;
}
