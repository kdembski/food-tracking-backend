import { Request, Response } from "express";
import { MembersService } from "@/main/members/services/members";
import { ApiError } from "@/_shared/errors/models/apiError";

export class MembersController {
  private service: MembersService;

  constructor(service = new MembersService()) {
    this.service = service;
  }

  async getAll(request: Request, response: Response) {
    try {
      const results = await this.service.getMembers();
      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }
}
