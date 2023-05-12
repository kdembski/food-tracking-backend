import { ListConfig } from "@/types/base/list";

export interface IListRepository<ItemQueryResult, Filters> {
  selectList: (config: ListConfig<Filters>) => Promise<ItemQueryResult[]>;
  selectCount: (filters: Filters) => Promise<number>;
}
