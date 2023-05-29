import { ICRUDService } from "@/interfaces/_shared/crud/crudService";
import { IMapper } from "@/interfaces/_shared/mapper";
import { CRUDRepository } from "@/repositories/_shared/crud";

export abstract class CRUDService<Model, QueryResult>
  implements ICRUDService<Model>
{
  protected repository: CRUDRepository<Model, QueryResult>;
  protected mapper: IMapper<Model, QueryResult>;

  constructor(
    repository: CRUDRepository<Model, QueryResult>,
    mapper: IMapper<Model, QueryResult>
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
