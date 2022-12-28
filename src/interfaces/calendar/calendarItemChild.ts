export interface ICalendarItemChild<ModelDTO> {
  getDTO(): ModelDTO;
  getDate(): Date | undefined;
  setDate(date: Date): void;
}

export interface ICalendarItemChildDatesController {
  getDates: (childId: number, fromDate: Date, toDate: Date) => Promise<Date[]>;
  getLastDate: (childId: number) => Promise<Date | undefined>;
  updateLastDate: (childId: number) => void;
  getDatesFromLastYear: (childId: number) => Promise<Date[][]>;
}
