import { IDbEntityService } from "@/interfaces/_shared/db-entity/dbEntityService";
import { IMapper } from "@/interfaces/_shared/mapper";
import { BaseRepository } from "@/repositories/_shared/base";

export abstract class DbEntityService<Model, QueryResult>
  implements IDbEntityService<Model>
{
  protected repository: BaseRepository<Model, QueryResult>;
  protected mapper: IMapper<Model, QueryResult>;

  constructor(
    repository: BaseRepository<Model, QueryResult>,
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
