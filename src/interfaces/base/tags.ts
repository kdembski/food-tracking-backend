import { RequestQueryData } from "@/types/helpers/requestQuery";

export interface ITags {
  getItemsDTO: () => void;
}

export interface ITagsBuilder {
  buildConfig(query: RequestQueryData): void;
  build(query: RequestQueryData): void;
}
