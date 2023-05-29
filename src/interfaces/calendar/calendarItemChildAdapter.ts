export interface ICalendarItemChildAdapter<Model> {
  get item(): Model;
  set item(item: Model);
  get date(): Date | undefined;
  set date(date: Date | undefined);
}
