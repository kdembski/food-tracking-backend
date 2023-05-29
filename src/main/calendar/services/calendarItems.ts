import { CalendarItem } from "@/main/calendar/models/calendarItem";
import { CalendarItemMembersService } from "./calendarItemMembers";
import { CalendarItemChildConfigFactory } from "../factories/calendarItemChildConfig";
import { CalendarDaysCollection } from "../collections/calendarDays";
import { DbEntityService } from "@/main/_shared/db-entity/services/dbEntity";
import { CalendarItemsRepository } from "@/repositories/calendar/calendarItems";
import { CalendarItemMapper } from "@/mappers/calendar/calendarItem";
import { CalendarItemQueryResultsCollectionMapper } from "@/mappers/calendar/calendarItemQueryResultsCollection";
import { CalendarItemQueryResult } from "@/dtos/calendar/calendarItem";

export class CalendarItemsService extends DbEntityService<
  CalendarItem,
  CalendarItemQueryResult
> {
  protected repository: CalendarItemsRepository;
  private collectionMapper: CalendarItemQueryResultsCollectionMapper;
  private membersService: CalendarItemMembersService;
  private childConfigFactory: CalendarItemChildConfigFactory;

  constructor(
    repository = new CalendarItemsRepository(),
    mapper = new CalendarItemMapper(),
    collectionMapper = new CalendarItemQueryResultsCollectionMapper(),
    membersService = new CalendarItemMembersService(),
    childConfigFactory = new CalendarItemChildConfigFactory()
  ) {
    super(repository, mapper);
    this.repository = repository;
    this.collectionMapper = collectionMapper;
    this.membersService = membersService;
    this.childConfigFactory = childConfigFactory;
  }

  async getDays(fromDate: Date, toDate: Date, members?: number[]) {
    const dtos = await this.repository.selectAll(fromDate, toDate);
    const calendarItems = this.collectionMapper.toDomain(dtos);
    await calendarItems.filterByMembers(members);
    const calendarDays = new CalendarDaysCollection(calendarItems.items);

    return calendarDays;
  }

  async create(calendarItem: CalendarItem) {
    const results = await super.create(calendarItem);
    await this.membersService.addCalendarItemToMembers(
      results.insertId,
      calendarItem.members || []
    );
    this.updateChildLastDate(calendarItem);

    return results;
  }

  async update(calendarItem: CalendarItem) {
    const results = super.update(calendarItem);
    this.updateChildLastDate(calendarItem);

    return results;
  }

  async delete(id: number) {
    const calendarItem = await super.getById(id);
    const results = super.delete(id);
    this.updateChildLastDate(calendarItem);

    return results;
  }

  private async updateChildLastDate(item: CalendarItem) {
    const config = this.childConfigFactory.createChildConfig(item);
    config.service.updateLastDate(config.id);
  }
}
