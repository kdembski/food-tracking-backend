export type JoinType =
  | "JOIN"
  | "LEFT JOIN"
  | "RIGHT JOIN"
  | "OUTER JOIN"
  | "INNER JOIN";

export type WhereOperator = "AND" | "OR";

export type WhereBetween = {
  from: string;
  to: string;
};
