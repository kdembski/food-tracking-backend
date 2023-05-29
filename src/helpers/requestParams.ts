import { CustomError } from "@/_shared/errors/models/customError";
import { RequestParamsData } from "@/types/helpers/requestParams";

export class RequestParamsHelper {
  private _id: string;

  constructor(params: RequestParamsData) {
    this._id = params.id;
  }

  get id() {
    const id = parseInt(this._id);

    if (!id || isNaN(id)) {
      throw new CustomError({
        message: "Invalid request parameter: id",
      });
    }

    return id;
  }
}
