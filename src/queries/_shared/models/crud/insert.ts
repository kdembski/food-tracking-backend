import { IQuery } from "@/interfaces/_shared/queries/query";

export class InsertQuery implements IQuery {
  private _query: string;

  constructor(tableName: string, fields?: string[]) {
    const preparedFields = this.prepareFields(fields || []);
    this._query = `INSERT INTO ${tableName} SET ${preparedFields}`;
  }

  private prepareFields(fields: string[]) {
    return fields
      .reduce((accum, field) => {
        accum += field + " = ?, ";
        return accum;
      }, "")
      .slice(0, -2);
  }

  get query() {
    return this._query;
  }
}
