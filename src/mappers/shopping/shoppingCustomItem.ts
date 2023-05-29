import { ShoppingCustomItemDTO } from "@/dtos/shopping/shoppingCustomItems";
import { IMapper } from "@/interfaces/_shared/mapper";
import { ShoppingCustomItem } from "@/main/shopping/models/shoppingCustomItem";

export class ShoppingCustomItemMapper
  implements IMapper<ShoppingCustomItem, ShoppingCustomItemDTO>
{
  toDTO(model: ShoppingCustomItem) {
    return {
      id: model.id,
      name: model.name,
    };
  }

  toDomain(dto: ShoppingCustomItemDTO) {
    return new ShoppingCustomItem(dto);
  }
}
