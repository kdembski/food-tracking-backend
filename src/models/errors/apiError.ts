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

  send() {
    this._response.status(this.status).send({
      message: this.message,
      code: this.code,
    });
  }
}
