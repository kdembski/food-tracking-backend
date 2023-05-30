export interface IToDTOMapper<Model, ModelDTO> {
  toDTO(model: Model): ModelDTO;
}
