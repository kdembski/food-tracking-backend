import { ShoppingCustomItemsRepository } from "@/repositories/shopping/shoppingCustomItems";
import { ShoppingCustomItem } from "../models/shoppingCustomItem";
import { DbEntityService } from "@/main/_shared/db-entity/services/dbEntity";
import { ShoppingCustomItemDTO } from "@/dtos/shopping/shoppingCustomItems";
import { ShoppingCustomItemMapper } from "@/mappers/shopping/shoppingCustomItem";

export class ShoppingCustomItemsService extends DbEntityService<
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
