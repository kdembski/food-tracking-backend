import { CalendarItemChildController } from "@/abstract/controllers/calendarItemChild";
import {
  IDbEntityController,
  IDbEntityModel,
} from "@/interfaces/base/dbEntity";
import { endOfMonth, endOfYear, startOfMonth, startOfYear } from "date-fns";

const dates = [new Date(2000, 0, 0), new Date(2000, 0, 1)];

const item = {
  date: new Date(2000, 0, 1),
  getDTO: jest.fn(),
};

const getById = jest.fn().mockImplementation(() => Promise.resolve(item));
const create = jest.fn();
const update = jest.fn();
const _delete = jest.fn();
class TestController implements IDbEntityController<IDbEntityModel<any>, any> {
  getById = getById;
  create = create;
  update = update;
  delete = _delete;
}

class CalendarItemTestChildController extends CalendarItemChildController<
  IDbEntityModel<any>,
  any
> {
  constructor() {
    super(new TestController());
  }

  protected getCalendarItemChildDates(
    childId: number,
    fromDate: Date,
    toDate: Date
  ) {
    return Promise.resolve([...dates]);
  }

  getDate(item: any) {
    return item.date;
  }

  setDate(item: any, date: any) {
    item.date = date;
  }
}

describe("Tags Model", () => {
  let testChildController: CalendarItemTestChildController;

  beforeEach(() => {
    testChildController = new CalendarItemTestChildController();
    jest.useFakeTimers().setSystemTime(new Date(2000, 0, 0));
  });

  it("Should return the earliest date on getLastDate call", async () => {
    expect(await testChildController.getLastDate(1)).toEqual(dates[1]);
  });

  it("Should call getDates with start and end of month on getDatesInCurrentMonth call", async () => {
    testChildController.getDates = jest.fn();
    testChildController.getDatesInCurrentMonth(1);
    expect(testChildController.getDates).toHaveBeenCalledWith(
      1,
      startOfMonth(new Date(2000, 0, 0)),
      endOfMonth(new Date(2000, 0, 0))
    );
  });

  it("Should call getDates with start and end of year on getDatesInCurrentYear call", async () => {
    testChildController.getDates = jest.fn();
    testChildController.getDatesInCurrentYear(1);
    expect(testChildController.getDates).toHaveBeenCalledWith(
      1,
      startOfYear(new Date(2000, 0, 0)),
      endOfYear(new Date(2000, 0, 0))
    );
  });

  it("Should not update last date if the same as item current date", async () => {
    await testChildController.updateLastDate(1);
    expect(getById).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledTimes(0);
  });

  it("Should update last date if the same as item current date", async () => {
    item.date = new Date(2000, 0, 0);
    await testChildController.updateLastDate(1);
    expect(getById).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledTimes(1);
  });
});
