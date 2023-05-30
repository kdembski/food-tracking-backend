import { CalendarItemQueryResult } from "@/dtos/calendar/calendarItem";
import { CalendarItemsCollection } from "@/main/calendar/collections/calendarItems";
import { CalendarItemQueryResultMapper } from "./calendarItemQueryResult";
import { IToDomainMapper } from "@/interfaces/_shared/mappers/toDomainMapper";

export class CalendarItemQueryResultsCollectionMapper
  implements
    IToDomainMapper<CalendarItemsCollection, CalendarItemQueryResult[]>
{
  toDomain(dtos: CalendarItemQueryResult[]) {
    return new CalendarItemsCollection(
      dtos.map((dto) => new CalendarItemQueryResultMapper().toDomain(dto))
    );
  }
}
