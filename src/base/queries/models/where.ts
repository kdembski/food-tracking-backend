import { CustomError } from "@/base/errors/models/customError";
import { WhereBetween } from "@/types/base/queries";

export class Where {
  private field: string;
  private like?: string;
  private between?: WhereBetween;
  private equals?: number | string;
  private collate = "utf8mb4_general_ci";

  constructor(data: {
    field: string;
    like?: string;
    between?: WhereBetween;
    equals?: number | string;
  }) {
    this.field = data.field;
    this.like = data.like;
    this.between = data.between;
    this.equals = data.equals;
  }

  prepare() {
    let condition = "";

    if (!this.like && !this.between && !this.equals) {
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

    if (this.equals) {
      condition = `= ${this.equals}`;
    }

    return `${this.field}${
      this.like ? " COLLATE " + this.collate : ""
    } ${condition}`;
  }
}
