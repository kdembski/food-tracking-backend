export interface IModel<ModelDTO> {
  setFromDTO: (data: ModelDTO) => void;
  getDTO: () => ModelDTO;
}
