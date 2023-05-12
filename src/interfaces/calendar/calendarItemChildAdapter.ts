export interface ICalendarItemChildAdapter<Model> {
  loadItem(): void;
  updateItem(): void;
  get item(): Model;
  set item(item: Model);
  getDate(): Date | undefined;
  setDate(date: Date): void;
}
