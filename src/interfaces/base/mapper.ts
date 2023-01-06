export interface IMapper<Model, ModelDTO> {
  toDTO(model: Model): ModelDTO;
  toDomain(dto: ModelDTO): Model;
}
