import { Field } from "../models/field";

export class FieldsCollection {
  private fields: Field[];

  constructor(fields?: Field[]) {
    this.fields = fields || [];
  }

  prepare() {
    return (
      this.fields
        .reduce((accum, field) => {
          accum += `${field.prepare()}, `;
          return accum;
        }, "")
        .slice(0, -2) || ""
    );
  }
}
