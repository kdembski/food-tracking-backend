import { Where } from "@/queries/_shared/models/where";

export type JoinType =
  | "JOIN"
  | "LEFT JOIN"
  | "RIGHT JOIN"
  | "OUTER JOIN"
  | "INNER JOIN";

export enum WhereOperators {
  AND = "AND",
  OR = "OR",
}

export enum WhereParenthesis {
  LEFT = "(",
  RIGHT = ")",
}

export type WheresCollectionItems = Where | WhereOperators | WhereParenthesis;

export type WhereBetween = {
  from: string;
  to: string;
};

export type WhereFindInSet = {
  value: string | number;
  set: string;
};
