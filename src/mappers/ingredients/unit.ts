import { UnitDTO } from "@/dtos/ingredients/unit";
import { IMapper } from "@/interfaces/_shared/mapper";
import { Unit } from "@/main/ingredients/models/unit";

export class UnitMapper implements IMapper<Unit, UnitDTO> {
  toDTO(model: Unit) {
    return {
      id: model.id,
      name: model.name,
      shortcut: model.shortcut,
    };
  }

  toDomain(dto: UnitDTO) {
    return new Unit(dto);
  }
}
