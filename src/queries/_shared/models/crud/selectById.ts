import { WhereOperators, WheresCollectionItems } from "@/types/_shared/queries";
import { IQuery } from "@/interfaces/_shared/queries/query";
import { Field } from "../../components/models/field";
import { Join } from "../../components/models/join";
import { SelectQuery } from "../select";
import { Where } from "../../components/models/where";

export class SelectByIdQuery implements IQuery {
  private _query: string;

  constructor(
    tableName: string,
    selector = "id",
    fields: Field[] = [],
    wheres: WheresCollectionItems[] = [],
    joins: Join[] = []
  ) {
    this.pushIdToWheres(wheres, selector);
    this._query = new SelectQuery(tableName, fields, wheres, joins).query;
  }

  private pushIdToWheres(wheres: WheresCollectionItems[], selector: string) {
    if (!wheres) {
      return;
    }

    const idWhere = new Where({
      field: selector,
      equals: "?",
    });

    if (wheres.length === 0) {
      wheres.push(idWhere);
      return;
    }

    wheres.push(WhereOperators.AND, idWhere);
  }

  get query() {
    return this._query;
  }
}
