import { RequestQueryData } from "@/types/helpers/requestQuery";

export interface IListBuilder<Filters> {
  build(query: RequestQueryData, filters: Filters): void;
  produceConfig(query: RequestQueryData, filters: Filters): void;
  produceData(): void;
  producePagination(): void;
}
