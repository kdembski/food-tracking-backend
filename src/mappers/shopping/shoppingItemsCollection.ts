import { IMapper } from "@/interfaces/_shared/mapper";
import { ShoppingItemQueryResultMapper } from "./shoppingItemQueryResult";
import { ShoppingItemsCollection } from "@/main/shopping/models/shoppingItemsCollection";
import {
  ShoppingItemDTO,
  ShoppingItemQueryResult,
} from "@/dtos/shopping/shoppingItems";
import { ShoppingItemMapper } from "./shoppingItem";

export class ShoppingItemsCollectionMapper
  implements IMapper<ShoppingItemsCollection, ShoppingItemDTO[]>
{
  toDTO(model: ShoppingItemsCollection) {
    return (
      model.items?.map((item) => new ShoppingItemMapper().toDTO(item)) || []
    );
  }

  toDomain(dtos: ShoppingItemDTO[]) {
    return new ShoppingItemsCollection(
      dtos.map((dto) => new ShoppingItemMapper().toDomain(dto))
    );
  }

  fromQueryResultToDomain(dtos: ShoppingItemQueryResult[]) {
    return new ShoppingItemsCollection(
      dtos.map((dto) => new ShoppingItemQueryResultMapper().toDomain(dto))
    );
  }
}
