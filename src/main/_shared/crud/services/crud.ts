import { ICRUDService } from "@/interfaces/_shared/crud/crudService";
import { IToDomainMapper } from "@/interfaces/_shared/mappers/toDomainMapper";
import { CRUDRepository } from "@/repositories/_shared/crud";

export abstract class CRUDService<Model, QueryResult>
  implements ICRUDService<Model>
{
  protected repository: CRUDRepository<Model, QueryResult>;
  protected mapper: IToDomainMapper<Model, QueryResult>;

  constructor(
    repository: CRUDRepository<Model, QueryResult>,
    mapper: IToDomainMapper<Model, QueryResult>
  ) {
    this.repository = repository;
    this.mapper = mapper;
  }

  async getById(id: number) {
    const dto = await this.repository.selectById(id);
    return this.mapper.toDomain(dto);
  }

  create(model: Model) {
    return this.repository.insert(model);
  }

  update(model: Model) {
    return this.repository.update(model);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
