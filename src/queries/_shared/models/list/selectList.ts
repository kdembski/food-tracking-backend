import { ListConfig } from "@/types/_shared/list";
import { IQuery } from "@/interfaces/_shared/queries/query";

export class SelectListQuery implements IQuery {
  private _query: string;

  constructor(selectAllQuery: string, config: ListConfig<unknown>) {
    this._query = selectAllQuery;

    const { sortAttribute, sortDirection, size, offset } = config;
    this.produceOrderBy(sortAttribute, sortDirection);
    this.produceLimitAndOffset(size, offset);
  }

  produceOrderBy(attr?: string, dir?: string) {
    if (!attr || !dir) {
      return;
    }
    this._query += ` ORDER BY ${attr} ${dir.toUpperCase()}`;
  }

  produceLimitAndOffset(size: number, offset: number) {
    this._query += ` LIMIT ${size} OFFSET ${offset}`;
  }

  get query() {
    return this._query;
  }
}
