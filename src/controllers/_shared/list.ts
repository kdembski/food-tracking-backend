import { ApiError } from "@/_shared/errors/models/apiError";
import { ListService } from "@/main/_shared/list/listService";
import { Request, Response } from "express";

export class ListController<Item, ItemDTO, ItemQueryResult, Filters> {
  private service: ListService<Item, ItemDTO, ItemQueryResult, Filters>;

  constructor(service: ListService<Item, ItemDTO, ItemQueryResult, Filters>) {
    this.service = service;
  }

  async getList(request: Request, response: Response) {
    try {
      const list = await this.service.getList(request.query);
      response.json(list.toDTO());
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async getCount(request: Request, response: Response) {
    try {
      const count = await this.service.getCount(request.query);
      response.json(count);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }
}
