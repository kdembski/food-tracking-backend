import { CustomError } from "@/base/errors/models/customError";
import { WhereBetween, WhereOperator } from "@/types/base/queries";

export class Where {
  private field: string;
  private like?: string;
  private between?: WhereBetween;
  private _operator: WhereOperator;
  private collate = "utf8mb4_general_ci";

  constructor(data: {
    field: string;
    like?: string;
    between?: WhereBetween;
    operator: WhereOperator;
  }) {
    this.field = data.field;
    this.like = data.like;
    this.between = data.between;
    this._operator = data.operator;
  }

  get operator() {
    return this._operator;
  }

  prepare() {
    let condition = "";

    if (!this.like && !this.between) {
      throw new CustomError({
        message: "Database query: where clause condition is required",
      });
    }

    if (this.like) {
      condition = `LIKE '${this.like}'`;
    }

    if (this.between) {
      condition = `BETWEEN '${this.between.from}' AND '${this.between.to}'`;
    }

    return `${this.field} COLLATE ${this.collate} ${condition}`;
  }
}
