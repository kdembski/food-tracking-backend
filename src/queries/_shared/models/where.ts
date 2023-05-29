import { WhereBetween, WhereFindInSet } from "@/types/_shared/queries";
import lodash from "lodash";

export class Where {
  private field?: string;
  private like?: string;
  private between?: WhereBetween;
  private equals?: number | string | boolean;
  private findInSet?: WhereFindInSet;
  private collate = "utf8mb4_general_ci";

  constructor(data: {
    field?: string;
    like?: string;
    between?: WhereBetween;
    equals?: number | string | boolean;
    findInSet?: WhereFindInSet;
  }) {
    this.field = data.field;
    this.like = data.like;
    this.between = data.between;
    this.equals = data.equals;
    this.findInSet = data.findInSet;
  }

  prepare() {
    if (this.like) {
      return `${this.field} COLLATE ${this.collate} LIKE '${this.like}'`;
    }

    if (this.between) {
      return `${this.field} BETWEEN '${this.between.from}' AND '${this.between.to}'`;
    }

    if (!lodash.isNil(this.equals)) {
      return `${this.field} = ${this.equals}`;
    }

    if (this.findInSet) {
      return `FIND_IN_SET('${this.findInSet.value}', ${this.findInSet.set})`;
    }

    return "";
  }
}
