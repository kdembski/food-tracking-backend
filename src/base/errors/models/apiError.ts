import { COMPLEX_ERROR } from "@/consts/errorCodes";
import { Response } from "express";
import { CustomError } from "./customError";

export class ApiError {
  private _message: string;
  private _code?: string;
  private _status?: number;
  private _response: Response;

  constructor(
    error: { message: string; code?: string; status?: number },
    response: Response
  ) {
    this._message = error.message;
    this._code = error.code;
    this._status = error.status;
    this._response = response;
    console.log(error);
  }

  static create(error: unknown, response: Response) {
    if (error instanceof CustomError || error instanceof Error) {
      return new ApiError(error, response);
    }

    return new ApiError({ message: "Unexpected error" }, response);
  }

  get message() {
    return this._message;
  }

  get status() {
    return this._status || 500;
  }

  get code() {
    return this._code;
  }

  isComplexError() {
    return this.code === COMPLEX_ERROR;
  }

  send() {
    this._response.status(this.status).send({
      message: this.isComplexError() ? JSON.parse(this.message) : this.message,
      code: this.code,
    });
  }
}
