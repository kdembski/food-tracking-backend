import { WheresCollectionItems } from "@/types/_shared/queries";
import { IQuery } from "@/interfaces/_shared/queries/query";
import { WheresCollection } from "../../components/collections/where";

export class DeleteQuery implements IQuery {
  private _query: string;

  constructor(tableName: string, wheres?: WheresCollectionItems[]) {
    let preparedWheres = new WheresCollection(wheres).prepare();
    preparedWheres = preparedWheres ? " " + preparedWheres : "";

    this._query = `DELETE FROM ${tableName + preparedWheres}`;
  }

  get query() {
    return this._query;
  }
}
