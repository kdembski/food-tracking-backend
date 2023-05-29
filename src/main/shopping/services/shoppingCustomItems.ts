import { ShoppingCustomItemsRepository } from "@/repositories/shopping/shoppingCustomItems";
import { ShoppingCustomItem } from "../models/shoppingCustomItem";
import { CRUDService } from "@/main/_shared/crud/services/crud";
import { ShoppingCustomItemDTO } from "@/dtos/shopping/shoppingCustomItems";
import { ShoppingCustomItemMapper } from "@/mappers/shopping/shoppingCustomItem";

export class ShoppingCustomItemsService extends CRUDService<
  ShoppingCustomItem,
  ShoppingCustomItemDTO
> {
  protected repository: ShoppingCustomItemsRepository;
  protected mapper: ShoppingCustomItemMapper;

  constructor(
    repository = new ShoppingCustomItemsRepository(),
    mapper = new ShoppingCustomItemMapper()
  ) {
    super(repository, mapper);
    this.repository = repository;
    this.mapper = mapper;
  }

  getOptions() {
    return this.repository.selectOptions();
  }
}
