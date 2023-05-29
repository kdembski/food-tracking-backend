export class CustomError extends Error {
  code?: string;
  status?: number;

  constructor(error: { message: string; code?: string; status?: number }) {
    if (!error.status) {
      error.status = 400;
    }

    super(error.message);
    this.code = error.code;
    this.status = error.status;
  }
}
