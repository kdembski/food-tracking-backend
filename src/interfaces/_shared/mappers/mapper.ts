import { IToDomainMapper } from "./toDomainMapper";
import { IToDTOMapper } from "./toDtoMapper";

export interface IMapper<Model, ModelDTO>
  extends IToDTOMapper<Model, ModelDTO>,
    IToDomainMapper<Model, ModelDTO> {}
