import {
  WhereOperators,
  WhereParenthesis,
  WheresCollectionItems,
} from "@/types/_shared/queries";
import { Where } from "../models/where";

export class WheresGenerator {
  generateMultipleValues(
    values: string[],
    field: string,
    operator: WhereOperators
  ) {
    if (!values || values.length === 0 || !field) {
      return [];
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

    return wheres;
  }

  generateMultipleFields(
    fields: string[],
    value: string,
    operator: WhereOperators
  ) {
    if (!fields || fields.length === 0 || !value) {
      return [];
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

    return wheres;
  }
}
