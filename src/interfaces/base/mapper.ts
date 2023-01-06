export interface Mapper<Model, ModelDTO> {
  toDTO(model: Model): ModelDTO;
  toDomain(dto: ModelDTO): Model;
}
