import { TagsBuilder } from "@/base/tags/builders/tags";
import { ICalendarItemChildAdapter } from "@/interfaces/calendar/calendarItemChild";
import { CalendarItemChildController } from "@/main/calendar/controllers/calendarItemChild";
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

export class TestController extends CalendarItemChildController<Model> {
  constructor() {
    super(new TestAdapter(), 1);
  }

  protected getCalendarItemChildDates() {
    return Promise.resolve(clone(dates));
  }
}

describe("Calendar Item Child Controller", () => {
  let controller: TestController;

  beforeEach(() => {
    controller = new TestController();

    jest.useFakeTimers().setSystemTime(new Date(2000, 10, 1));
  });

  it("Should return last date", async () => {
    expect(await controller.getLastDate()).toEqual(new Date(2000, 3, 1));
  });

  it("Should update item last date", async () => {
    await controller.updateLastDate();
    expect(model.date).toEqual(new Date(2000, 3, 1));
    expect(updateItem).toBeCalledTimes(1);

    await controller.updateLastDate();
    expect(updateItem).toBeCalledTimes(1);
  });

  it("Should return dates from last year", async () => {
    expect(await controller.getDatesFromLastYear()).toEqual([
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
