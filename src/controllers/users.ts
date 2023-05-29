import { Request, Response } from "express";
import { UsersService } from "@/main/users/services/users";
import { ApiError } from "@/_shared/errors/models/apiError";

export class UsersController {
  private service: UsersService;

  constructor(service = new UsersService()) {
    this.service = service;
  }

  async login(
    request: Request<{}, {}, { password: string }>,
    response: Response
  ) {
    try {
      const password = request.body.password;

      const accessToken = await this.service.login(password);
      response.json({ accessToken });
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }
}
