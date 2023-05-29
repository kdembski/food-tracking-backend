import { ListConfig } from "@/types/_shared/list";

export interface IListRepository<ItemQueryResult, Filters> {
  selectList: (config: ListConfig<Filters>) => Promise<ItemQueryResult[]>;
  selectCount: (filters: Filters) => Promise<number>;
}
