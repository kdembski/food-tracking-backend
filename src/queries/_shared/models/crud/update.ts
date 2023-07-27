import { WheresCollectionItems } from "@/types/_shared/queries";
import { IQuery } from "@/interfaces/_shared/queries/query";
import { WheresCollection } from "../../components/collections/where";

export class UpdateQuery implements IQuery {
  private _query: string;

  constructor(
    tableName: string,
    fields?: string[],
    wheres?: WheresCollectionItems[]
  ) {
    let preparedWheres = new WheresCollection(wheres).prepare();
    preparedWheres = preparedWheres ? " " + preparedWheres : "";

    const preparedFields = this.prepareFields(fields || []);
    this._query = `UPDATE ${tableName} SET ${preparedFields + preparedWheres}`;
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
