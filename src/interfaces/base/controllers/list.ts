import { RequestQueryData } from "@/interfaces/helpers/requestQuery";

export interface IListController<List> {
  getList: (query: RequestQueryData) => Promise<List>;
  getCount: (searchPhrase: string, tags?: string) => Promise<number>;
}
