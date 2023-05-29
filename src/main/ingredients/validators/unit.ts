import { Validator } from "@/_shared/errors/validator";
import { UnitErrors } from "../models/errors/unit";
import { Unit } from "../models/unit";

export class UnitValidator extends Validator<Unit> {
  private _errors?: UnitErrors;

  get errors() {
    return this._errors;
  }

  override throwErrors() {
    super.throwErrors(this.errors);
  }

  validate(model: Unit) {
    this._errors = new UnitErrors({
      name: this.getNameError(model.name),
      shortcut: this.getShortcutError(model.shortcut),
    });

    return this;
  }

  getNameError(name?: string) {
    if (!name) {
      return this.getRequiredFieldError();
    }

    return;
  }

  getShortcutError(shortcut?: string) {
    if (!shortcut) {
      return this.getRequiredFieldError();
    }

    return;
  }
}
