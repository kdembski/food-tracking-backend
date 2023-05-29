export interface ICalendarItemChildDatesManager {
  getDates: (childId: number, fromDate: Date, toDate: Date) => Promise<Date[]>;
  getLastDate: (childId: number) => Promise<Date | undefined>;
  getDatesFromLastYear: (childId: number) => Promise<Date[][]>;
}
