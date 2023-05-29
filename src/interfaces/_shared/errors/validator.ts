import { IErrors } from "./errors";

export interface IValidator<Model> {
  throwErrors(errors?: IErrors): void;
  validate(model: Model): IValidator<Model>;
}
