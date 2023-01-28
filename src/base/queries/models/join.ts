import { JoinType } from "@/types/base/queries";

export class Join {
  private type: JoinType;
  private table: string;
  private on: string;
  private equals: string;

  constructor(data: {
    type?: JoinType;
    table: string;
    on: string;
    equals: string;
  }) {
    this.type = data.type || "JOIN";
    this.table = data.table;
    this.on = data.on;
    this.equals = data.equals;
  }

  prepare() {
    return `${this.type} ${this.table} ON ${this.on} = ${this.table}.${this.equals}`;
  }
}
