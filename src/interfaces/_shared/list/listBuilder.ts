import { RequestQueryData } from "@/types/helpers/requestQuery";

export interface IListBuilder {
  build(query: RequestQueryData): void;
  produceConfig(query: RequestQueryData): void;
  produceData(): void;
  producePagination(query: RequestQueryData): void;
}
