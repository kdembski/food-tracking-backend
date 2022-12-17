import { RequestParamsData } from "@/interfaces/helpers/requestParams";
import { CustomError } from "@/models/errors/customError";

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
