import { RequestQueryData } from "../helpers/requestQuery";

export type TagsConfig = {
  searchPhrase: string;
  tags?: string;
};

export type TagDTO = {
  name: string;
  count: number;
};

export interface ITags {
  getItemsDTO: () => void;
}

export interface ITagsBuilder {
  buildConfig(query: RequestQueryData): void;
  build(query: RequestQueryData): void;
}
