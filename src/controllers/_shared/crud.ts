import { ApiError } from "@/_shared/errors/models/apiError";
import { RequestParamsHelper } from "@/helpers/requestParams";
import { IValidator } from "@/interfaces/_shared/errors/validator";
import { IMapper } from "@/interfaces/_shared/mapper";
import { CRUDService } from "@/main/_shared/crud/services/crud";
import { Request, Response } from "express";

export abstract class CRUDController<Model, ModelDTO, QueryResult> {
  protected service: CRUDService<Model, QueryResult>;
  protected mapper: IMapper<Model, ModelDTO>;
  protected validator: IValidator<Model>;

  constructor(
    service: CRUDService<Model, QueryResult>,
    mapper: IMapper<Model, ModelDTO>,
    validator: IValidator<Model>
  ) {
    this.service = service;
    this.mapper = mapper;
    this.validator = validator;
  }

  async getById(request: Request<{ id: string }>, response: Response) {
    try {
      const { id } = new RequestParamsHelper(request.params);

      const item = await this.service.getById(id);
      const dto = this.mapper.toDTO(item);
      response.json(dto);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async create(request: Request<{}, {}, ModelDTO>, response: Response) {
    try {
      const data = request.body;
      const item = this.mapper.toDomain(data);
      this.validator.validate(item).throwErrors();

      const results = await this.service.create(item);
      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async update(request: Request<{}, {}, ModelDTO>, response: Response) {
    try {
      const data = request.body;
      const item = this.mapper.toDomain(data);
      this.validator.validate(item).throwErrors();

      const results = await this.service.update(item);
      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }

  async delete(request: Request<{ id: string }>, response: Response) {
    try {
      const { id } = new RequestParamsHelper(request.params);

      const results = await this.service.delete(id);
      response.json(results);
    } catch (error) {
      ApiError.create(error, response).send();
    }
  }
}
