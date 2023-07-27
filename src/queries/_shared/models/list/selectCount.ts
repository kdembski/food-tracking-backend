import { IQuery } from "@/interfaces/_shared/queries/query";
import { SelectQuery } from "../select";

export class SelectCountQuery implements IQuery {
  private _query: string;

  constructor(selectAllQuery: string) {
    this._query = `SELECT COUNT(*) FROM (${selectAllQuery}) AS records`;
  }

  get query() {
    return this._query;
  }
}
