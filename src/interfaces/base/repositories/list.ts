import { ListConfig } from "./../models/list";

export interface IListRepository<ItemDTO> {
  selectList: (config: ListConfig) => Promise<ItemDTO[]>;
  selectCount: (searchPhrase: string, tags?: string) => Promise<number>;
}
