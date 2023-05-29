import { OrderedFood } from "@/main/ordered-food/models/orderedFood";
import { OrderedFoodListFilters } from "@/types/ordered-food/orderedFood";
import { OrderedFoodDTO } from "@/dtos/ordered-food/orderedFood";
import { OrderedFoodRepository } from "@/repositories/ordered-food/orderedFood";
import { OrderedFoodMapper } from "@/mappers/ordered-food/orderedFood";
import { ListService } from "@/main/_shared/list/listService";
import { OrderedFoodList } from "../models/orderedFoodList";
import { TagsBuilder } from "@/main/_shared/tags/tagsBuilder";
import { DbEntityService } from "@/main/_shared/db-entity/services/dbEntity";

export class OrderedFoodService extends DbEntityService<
  OrderedFood,
  OrderedFoodDTO
> {
  private tagsBuilder: TagsBuilder<OrderedFoodListFilters>;
  protected repository: OrderedFoodRepository;
  protected mapper: OrderedFoodMapper;

  list: ListService<
    OrderedFood,
    OrderedFoodDTO,
    OrderedFoodDTO,
    OrderedFoodListFilters
  >;

  constructor(
    repository = new OrderedFoodRepository(),
    mapper = new OrderedFoodMapper(),
    list = new ListService(new OrderedFoodList()),
    tagsBuilder = new TagsBuilder(repository)
  ) {
    super(repository, mapper);
    this.repository = repository;
    this.mapper = mapper;
    this.list = list;
    this.tagsBuilder = tagsBuilder;
  }

  async getTags(filters: OrderedFoodListFilters) {
    await this.tagsBuilder.build(filters);
    return this.tagsBuilder.tags;
  }
}
