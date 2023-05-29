import { ListConfig } from "@/types/_shared/list";

export interface IListQueries<Filters> {
  getSelectList(config: ListConfig<Filters>): string;
  getSelectCount(filters: Filters): string;
}
