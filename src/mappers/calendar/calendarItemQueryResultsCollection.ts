import { CalendarItemQueryResult } from "@/dtos/calendar/calendarItem";
import { IMapper } from "@/interfaces/_shared/mapper";
import { CalendarItemsCollection } from "@/main/calendar/collections/calendarItems";
import { CalendarItem } from "@/main/calendar/models/calendarItem";
import { CalendarItemQueryResultMapper } from "./calendarItemQueryResult";

export class CalendarItemQueryResultsCollectionMapper
  implements IMapper<CalendarItemsCollection, CalendarItemQueryResult[]>
{
  toDTO(collection: CalendarItemsCollection) {
    return collection.items.map((item) =>
      new CalendarItemQueryResultMapper().toDTO(item)
    );
  }

  toDomain(dtos: CalendarItemQueryResult[]) {
    return new CalendarItemsCollection(
      dtos.map((dto) => new CalendarItemQueryResultMapper().toDomain(dto))
    );
  }
}
