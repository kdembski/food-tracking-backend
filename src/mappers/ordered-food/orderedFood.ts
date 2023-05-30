import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { IMapper } from "@/interfaces/_shared/mappers/mapper";
import { OrderedFood } from "@/main/ordered-food/models/orderedFood";

export class OrderedFoodMapper implements IMapper<OrderedFood, OrderedFoodDTO> {
  toDTO(model: OrderedFood) {
    return {
      id: model.id,
      foodName: model.foodName,
      placeName: model.placeName,
      tags: model.tags,
      placeLink: model.placeLink,
      orderedDate: model.orderedDate,
    };
  }

  toDomain(dto: OrderedFoodDTO) {
    return new OrderedFood(dto);
  }
}
