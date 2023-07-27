import { IQuery } from "@/interfaces/_shared/queries/query";
import { WheresCollectionItems } from "@/types/_shared/queries";
import { Field } from "../components/models/field";
import { Join } from "../components/models/join";
import { FieldsCollection } from "../components/collections/field";
import { JoinsCollection } from "../components/collections/join";
import { WheresCollection } from "../components/collections/where";

export class SelectQuery implements IQuery {
  private _query: string;

  constructor(
    tableName: string,
    fields?: Field[],
    wheres?: WheresCollectionItems[],
    joins?: Join[]
  ) {
    const preparedFields = new FieldsCollection(fields).prepare();
    let preparedJoins = new JoinsCollection(joins).prepare();
    let preparedWheres = new WheresCollection(wheres).prepare();

    preparedJoins = preparedJoins ? " " + preparedJoins : "";
    preparedWheres = preparedWheres ? " " + preparedWheres : "";

    this._query = `SELECT ${preparedFields} FROM ${
      tableName + preparedJoins + preparedWheres
    }`;
  }

  get query() {
    return this._query;
  }
}
