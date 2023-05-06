import lodash from "lodash";
import { ListConfig } from "@/types/base/list";
import { WheresCollection } from "../collections/where";
import { Where } from "../models/where";
import {
  WhereOperators,
  WhereParenthesis,
  WheresCollectionItems,
} from "@/types/base/queries";

export class ListQueryBuilder {
  private _query: string;
  private _wheres: WheresCollectionItems[] = [];

  constructor(baseSelect: string) {
    this._query = baseSelect;
  }

  get query() {
    return this._query;
  }

  get wheres() {
    return this._wheres;
  }

  set query(value) {
    this._query = value;
  }

  set wheres(value) {
    this._wheres = value;
  }

  build(config: ListConfig<unknown>) {
    const { sortAttribute, sortDirection, size, offset } = config;
    this.produceFilterWheres();
    this.produceOrderBy(sortAttribute, sortDirection);
    this.produceLimitAndOffset(size, offset);
  }

  produceFilterWheres() {
    if (this.hasWhereClause() || this.wheres.length === 0) {
      return;
    }

    const lastWhere = this.wheres.at(-1);
    if (lastWhere === WhereOperators.AND || lastWhere === WhereOperators.OR) {
      this.wheres.pop();
    }

    this.query += " " + new WheresCollection(this.wheres).prepare();
  }

  produceMultipleValuesFilterWheres(
    field: string,
    values: string[],
    operator: WhereOperators
  ) {
    if (!values || values.length === 0 || !field) {
      return;
    }

    let wheres: WheresCollectionItems[] = values.flatMap(
      (value, index, array) => {
        const where = new Where({
          field,
          like: "%" + value + "%",
        });

        if (array.length - 1 === index) {
          return where;
        }

        return [where, operator];
      }
    );

    if (operator === WhereOperators.OR) {
      wheres = [WhereParenthesis.LEFT, ...wheres, WhereParenthesis.RIGHT];
    }

    this.wheres.push(...wheres, WhereOperators.AND);
  }

  produceMultipleFieldsFilterWheres(
    fields: string[],
    value: string,
    operator: WhereOperators
  ) {
    if (!fields || fields.length === 0 || !value) {
      return;
    }

    let wheres: WheresCollectionItems[] = fields.flatMap(
      (field, index, array) => {
        const where = new Where({
          field,
          like: "%" + value + "%",
        });

        if (array.length - 1 === index) {
          return where;
        }

        return [where, operator];
      }
    );

    if (operator === WhereOperators.OR) {
      wheres = [WhereParenthesis.LEFT, ...wheres, WhereParenthesis.RIGHT];
    }

    this.wheres.push(...wheres, WhereOperators.AND);
  }

  produceOrderBy(attr?: string, dir?: string) {
    if (!attr || !dir) {
      return;
    }
    this.query += ` ORDER BY ${attr} ${dir.toUpperCase()}`;
  }

  produceLimitAndOffset(size: number, offset: number) {
    this.query += ` LIMIT ${size} OFFSET ${offset}`;
  }

  private hasWhereClause() {
    return this.query.includes("WHERE");
  }
}
