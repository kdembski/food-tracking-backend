export class CalendarMonth {
  private _number: number;
  private _year: number;
  private _dates: Date[];

  constructor(number: number, year: number, dates: Date[] = []) {
    this._number = number;
    this._year = year;
    this._dates = dates;
  }

  get number() {
    return this._number;
  }

  get year() {
    return this._year;
  }

  get dates() {
    return this._dates;
  }

  addDate(date: Date) {
    this._dates.push(date);
  }
}
