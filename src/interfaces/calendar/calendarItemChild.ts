export interface ICalendarItemChildController {
  getDates: (childId: number, fromDate: Date, toDate: Date) => Promise<Date[]>;
  getLastDate: (childId: number) => Promise<Date | undefined>;
  getDatesInCurrentMonth: (childId: number) => Promise<Date[]>;
}
