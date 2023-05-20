import { ICalendarItemChildAdapter } from "@/interfaces/calendar/calendarItemChildAdapter";
import { CalendarItemChildService } from "@/main/calendar/services/calendarItemChild";
import { clone } from "lodash";

class Model {
  date: Date;

  constructor(date: Date) {
    this.date = date;
  }
}

const model = new Model(new Date(2000, 1, 1));
const updateItem = jest.fn();

class TestAdapter implements ICalendarItemChildAdapter<Model> {
  private _item?: Model;

  async loadItem() {
    this.item = model;
  }

  updateItem = updateItem;

  get item() {
    if (!this._item) {
      throw Error("test");
    }

    return this._item;
  }

  set item(value) {
    this._item = value;
  }

  getDate() {
    return this.item.date;
  }

  setDate(date: Date): void {
    this.item.date = date;
  }
}

const dates = [
  new Date(2000, 1, 1),
  new Date(2000, 2, 1),
  new Date(2000, 3, 1),
];

export class TestService extends CalendarItemChildService<Model> {
  constructor() {
    super(new TestAdapter(), 1);
  }

  protected getCalendarItemChildDates() {
    return Promise.resolve(clone(dates));
  }
}

describe("Calendar Item Child Service", () => {
  let service: TestService;

  beforeEach(() => {
    service = new TestService();

    jest.useFakeTimers().setSystemTime(new Date(2000, 10, 1));
  });

  it("Should return last date", async () => {
    expect(await service.getLastDate()).toEqual(new Date(2000, 3, 1));
  });

  it("Should update item last date", async () => {
    await service.updateLastDate();
    expect(model.date).toEqual(new Date(2000, 3, 1));
    expect(updateItem).toBeCalledTimes(1);

    await service.updateLastDate();
    expect(updateItem).toBeCalledTimes(1);
  });

  it("Should return dates from last year", async () => {
    expect(await service.getDatesFromLastYear()).toEqual([
      [],
      [],
      [new Date(2000, 1, 1)],
      [new Date(2000, 2, 1)],
      [new Date(2000, 3, 1)],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ]);
  });
});
