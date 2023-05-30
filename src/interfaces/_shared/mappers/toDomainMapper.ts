export interface IToDomainMapper<Model, ModelDTO> {
  toDomain(dto: ModelDTO): Model;
}
