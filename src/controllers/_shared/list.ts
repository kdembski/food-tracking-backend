import { ApiError } from "@/_shared/errors/models/apiError";
import { ListMapper } from "@/main/_shared/list/listMapper";
import { ListService } from "@/main/_shared/list/listService";
import { Request, Response } from "express";

export class ListController<Item, ItemDTO, ItemQueryResult, Filters> {
  private service: ListService<Item, ItemQueryResult, Filters>;
  private mapper: ListMapper<Item, ItemDTO>;

  constructor(
    service: ListService<Item, ItemQueryResult, Filters>,
    mapper: ListMapper<Item, ItemDTO>
  ) {
    this.service = service;
    this.mapper = mapper;
  }

  async getList(request: Request, response: Response) {
    try {
      const list = await this.service.getList(request.query);
      response.json(this.mapper.toDTO(list));
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
